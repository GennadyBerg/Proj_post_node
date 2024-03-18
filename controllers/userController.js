const { UserModel } = require("../MongoDBModels/User.js");
const { default: mongoose } = require('mongoose');
const { UserSchema } = require("../Validation/authValidationSchemas.js");



const User = mongoose.model('User', UserSchema);

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users)
    return users;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching users' });

  }
}

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
