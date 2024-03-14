
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require('fs');
const nodemailer = require('nodemailer');
const pug = require('pug');
const { UserModel } = require('../MongoDBModels/User');
const config = require("../config/config.json");
const { ApiError } = require("../middleware/ApiError.js");
const { error } = require("../Validation/objValidationSchemas.js");

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
    { id: user._id, username: user.username },
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
  return res.send('password was changed succsessfuly!');
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
    let user = req.user;
    try {
      const hashedPassword = bcrypt.hashSync(req.body.password, 10);
      user = await UserModel.findByIdAndUpdate(user._id, { password: hashedPassword }, { new: true });
      if (!user)
        return res.status(404).send({ message: 'User not found' });
      else
        return res.send('password was changed succsessfuly!');
    } catch (error) {
      const err = new ApiError(500, "error at  password restore.");
      return next(err);
    }
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
};

module.exports = {
  newPasswordTokenEnter,
  newPasswordTokenSave,
  newPasswordInit,
  newPasswordMail
};
