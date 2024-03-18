const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
    role: Number
    // role: {
    //     type: Number,
    //     enum: [0, 1, 2], //0-admin, 1-user, 2 - guest(unregistered) 
    //     default: 2
    //   }
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
