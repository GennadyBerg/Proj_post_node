const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
    // role: Number
    role: {
        type: Number,
        enum: [1, 2], //1-admin, 2-user
        default: 2
      }
});

const UserModel = mongoose.model('User', UserSchema);

const UserUtils = {
    findUserByUserName: async (username) =>
        await UserModel.findOne({ username }),
    findUserByid: async (id) =>
        await UserModel.findById(id),
    findUserByEmail: async (email) =>
        await UserModel.findOne({ email }),
    findAllUsers: async()=>
        await UserModel.findAllUsers()
}

module.exports = { UserModel, UserUtils };
