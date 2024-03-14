const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config.json");
const { ApiError } = require("../middleware/ApiError.js");
const { UserModel, UserUtils } = require("../MongoDBModels/User.js");
const { error } = require("../Validation/objValidationSchemas.js");
const fs = require('fs');
const nodemailer = require('nodemailer');
const pug = require('pug');

const signup = async (req, res, next) => {
  const user = req.body;
  console.log("In: " + user);

  const userDb = await UserUtils.findUserByLogin(user.login);
  if (userDb?.id) return next(new ApiError(400, "User name is already used"));

  const hashedPassword = bcrypt.hashSync(user.password, 10);
  console.log("Out: " + user);

  await UserModel.create({
    login: user.login,
    email: user.email,
    password: hashedPassword,
  });
  console.log("Saved: " + user);

  return res.status(201).json({ message: "Registration successful" });
};

const signin = async (req, res, next) => {
  const user = req.body;

  const userDb = await UserUtils.findUserByLogin(user.login);
  console.log(user);

  if (!user || !userDb || !bcrypt.compareSync(user.password, userDb.password)) {
    const error = new ApiError(400, "Invalid username or password");
    return next(error);
  }

  const accessToken = jwt.sign(
    { id: user.id, login: user.login },
    config.env.JWT_SECRET,
    { expiresIn: config.env.tokenExpiration }
  );

  const refreshToken = jwt.sign(
    { id: user.id, login: user.login },
    config.env.JWT_REFRESH_SECRET
  );

  return res
    .status(200)
    .json({ accessToken, refreshToken, message: "Authentication successful" });
};

const refreshToken = async (req, res, next) => {
  const user = req.body;
  let refreshToken = req.headers["authorization"];

  if (!refreshToken) {
    const error = new ApiError(401, "Refresh token is required");
    return next(error);
  }

  refreshToken = refreshToken.trim().substring("Bearer ".length).trim();

  if (!user) {
    const error = new ApiError(400, "Request format problem.");
    return next(error);
  }

  const userDb = await UserUtils.findUserByLogin(user.login);

  try {
    const userTkn = jwt.verify(refreshToken, config.env.JWT_REFRESH_SECRET);

    //console.log([user, userDb, userTkn])

    if (!userDb || user.login !== userTkn.login) {
      throw new ApiError(400, "Token format problem.");
    }

    const accessToken = jwt.sign(
      { id: user.id, login: user.login },
      config.env.JWT_SECRET,
      { expiresIn: config.env.tokenExpiration }
    );

    console.log(accessToken);

    return res.status(200).json({ accessToken });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(new ApiError(401, error.message));
    }
    return next(error);
  }
};

const getMe = async (req, res, next) => {
  const user = await req.user;
  return res
    .status(200)
    .json({ id: user.id, login: user.login, email: user.email });
};

const newPasswordInit = async (req, res, next) => {
  try {
    fs.readFile('./views/init-pass.html', 'utf8', (err, data) => {
      if (err) {
        const error = new ApiError(500, "Invalid file reading");
        return next(error);
      } else {
        res.send(data);
      }
    });
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
};

const newPasswordMail = async (req, res, next) => {
  const email = req.body?.email;
  if (!email)
    return next(new ApiError(400, "Can't restore user."));
  const user = await UserModel.findOne({ email });
  if (!user)
    return next(new ApiError(400, "Can't restore user."));

  const newPasswordToken = jwt.sign(
    { id: user.id, login: user.login },
    config.env.JWT_NEW_PASSW_SECRET,
    { expiresIn: config.env.newPasswordTokenExpiration }
  );

  const link = `http://localhost:3000/reset-password?token=${newPasswordToken}`;
 
  const html = pug.renderFile('./views/password-reset-mail.pug', { title: 'Hey', message: 'Hello there!', restorPasswordLink: `${link}` });

  // console.log({ html })

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "gennady.berg@gmail.com",
      pass: "lnprcjcxddnrqajs",
    },
  });

  const info = await transporter.sendMail({
    from: '', // sender address
    to: "snack.uventa@gmail.com", // list of receivers
    subject: "Hello test", // Subject line
    text: "password : generate new password() ", // plain text body
    html: html, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

const newPasswordTokenEnter = async (req, res, next) => {
  try {
    const user = req.user;
    if (user === error)
      next(error);
    else {
      fs.readFile('./views/create-pass.html', 'utf8', (err, data) => {
        if (err) {
          const error = new ApiError(500, "Invalid file reading");
          return next(error);
        } else {
          const newPasswordToken = jwt.sign(
            { id: user.id, login: user.login },
            config.env.JWT_NEW_PASSW_SECRET,
            { expiresIn: config.env.newPasswordTokenExpiration }
          );
          data = data.replace("{{token}}", newPasswordToken);
          res.send(data);
        }
      });
    }
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
};

const newPasswordTokenSave = async (req, res, next) => {
  try {
    const user = req.user;
    try {
      const hashedPassword = bcrypt.hashSync(req.password, 10);
      await UserModel.update({
        id: user.id,
        password: hashedPassword,
      });
      res.send('password was changed succsessfuly!');
    } catch (error) {
      const err = new ApiError(500, "error writing file to db");
      return next(err);
    }
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
};


module.exports = {
  signup,
  signin,
  refreshToken,
  getMe,
  newPasswordTokenEnter,
  newPasswordTokenSave,
  newPasswordInit,
  newPasswordMail
};
