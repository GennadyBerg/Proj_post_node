const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config.json");
const { ApiError } = require("../middleware/ApiError.js");
const { UserModel, UserUtils } = require("../MongoDBModels/User.js");

const signup = async (req, res, next) => {
  const user = req.body;
  // console.log("In: " + user);

  const userDb = await UserUtils.findUserByUserName(user.username);
  if (userDb?.id) return next(new ApiError(400, "User name is already used"));

  const hashedPassword = bcrypt.hashSync(user.password, 10);
  // console.log("Out: " + user);

  await UserModel.create({
    email: user.email,
    password: hashedPassword,
    role: user.role,
    username: user.username
  });
  // console.log("Saved: " + user);

  return res.status(201).json({ message: "Registration successful", user });
};

const signin = async (req, res, next) => {
  const user = req.user;

  const accessToken = jwt.sign(
    { id: user._id, username: user.username },
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
  const user = req.user;

  try {

    const accessToken = jwt.sign(
      { id: user._id, username: user.username },
      config.env.JWT_SECRET,
      { expiresIn: config.env.tokenExpiration }
    );

    // console.log(accessToken);

    return res.status(200).json({ accessToken });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(new ApiError(401, error.message));
    }
    return next(error);
  }
};

module.exports = { signup, signin, refreshToken };
