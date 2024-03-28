const { UserModel } = require("../MongoDBModels/User.js");
const { default: mongoose } = require('mongoose');
const { UserSchema } = require("../Validation/authValidationSchemas.js");
const entityController = require("./entityController.js");

const getAllUsers = async (req, res) => await entityController.getAllEntities(req, res, UserModel);

const getMe = async (req, res) => {
  const user = req.user;
  return res
    .status(200)
    .json({ id: user._id, username: user.username, email: user.email });
};

const deleteUserById = async (req, res) => {
  try {
    const result = await UserModel.deleteOne({ _id: req.params.id });

    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = { getAllUsers, getMe, deleteUserById };
