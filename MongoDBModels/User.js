const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    login: String,
    password: String,
    email: String,
    role: Number
});

const UserModel = mongoose.model('User', UserSchema);

const UserUtils = {
    findUserByLogin: async (login) =>
        await UserModel.findOne({ username: login }),
    findUserByid: async (id) =>
        await UserModel.findById(id),
    findUserByEmail: async (email) =>
        await UserModel.findOne({ email }),
}

module.exports = { UserModel, UserUtils };
