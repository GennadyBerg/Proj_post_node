const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config.json");
const { ApiError } = require("../middleware/ApiError.js");
const { UserModel, UserUtils } = require("../MongoDBModels/User.js");

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

  const userDb = await UserUtils.findUserByLogin(user.username);
  console.log(user);

  if (!user || !userDb || !bcrypt.compareSync(user.password, userDb.password)) {
    const error = new ApiError(400, "Invalid username or password");
    return next(error);
  }

  const accessToken = jwt.sign(
    { id: userDb._id, username: userDb.username },
    config.env.JWT_SECRET,
    { expiresIn: config.env.tokenExpiration }
  );

  const refreshToken = jwt.sign(
    { id: user._id, username: user.username },
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



module.exports = {
  signup,
  signin,
  refreshToken,
  getMe,
};
