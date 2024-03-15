const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
    role: Number
});

const UserModel = mongoose.model('User', UserSchema);

const UserUtils = {
    findUserByUserName: async (username) =>
        await UserModel.findOne({ username }),
    findUserByid: async (id) =>
        await UserModel.findById(id),
    findUserByEmail: async (email) =>
        await UserModel.findOne({ email }),
}

module.exports = { UserModel, UserUtils };
