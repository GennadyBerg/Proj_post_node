const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config.json");
const { ApiError } = require("../middleware/ApiError.js");
const { UserModel, UserUtils } = require("../MongoDBModels/User.js");
const { error } = require("../Validation/objValidationSchemas.js");
const fs = require('fs');

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

const newPasswordTokenCreate = async (email) => {
  const user = await UserUtils.findUserByEmail(email);
  console.log(user);

  if (!user) {
    const error = new ApiError(400, "Can't restore password.");
    return next(error);
  }

  const newPasswordToken = jwt.sign(
    { id: user.id, login: user.login },
    config.env.JWT_NEW_PASSW_SECRET,
    { expiresIn: config.env.newPasswordTokenExpiration }
  );

  console.log(newPasswordToken);
  return `http://localhost:3000/api/auth/new-pass?token=${newPasswordToken}`;
};

const newPasswordTokenCheckInt = async (token) => {
  try {
    const userTkn = jwt.verify(token, config.env.JWT_NEW_PASSW_SECRET);
    const userDb = await UserUtils.findUserByid(userTkn.id);

    //console.log([user, userDb, userTkn])

    if (!userDb) {
      return new ApiError(400, "Token format problem.");
    }

    console.log(accessToken);
    return userDb;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return new ApiError(401, error.message);
    }
    return next(error);
  }
};

const newPasswordTokenCheck = async (req, res, next) => {
  try {
    const token = req.query.token;
    const user = await newPasswordTokenCheckInt(token);
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

const newPasswordTokenChange = async (req, res, next) => {
  try {
    const token = req.body.token;
    const userTkn = jwt.verify(token, config.env.JWT_NEW_PASSW_SECRET);
    const userDb = await UserUtils.findUserByLogin(userTkn.login);
    if (userDb === error)
      next(error);
    else {
      //Update UserDbPassword with req.body.password
      res.status(201).json({
        result: "OK",
      });
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
  newPasswordTokenCreate,
  newPasswordTokenCheck,
};
