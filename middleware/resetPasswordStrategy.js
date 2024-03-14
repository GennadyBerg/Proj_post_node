const { Strategy } = require('passport-jwt');
const config = require('../config/config.json');
const { UserModel } = require('../MongoDBModels/User');

let resetPasswEnterOption = {
  jwtFromRequest: (req) => req.query?.token,
  secretOrKey: config.env.JWT_NEW_PASSW_SECRET
};

const resetPasswEnterStrategy =
  new Strategy(resetPasswEnterOption, async (payload, done) => {
    const { id } = payload
    try {
      user = await UserModel.findById(id)
      if (user) {
        done(null, user)
      } else {
        done(null, false)
      }
    } catch (e) {
      console.log(e)
    }
  });

const resetPasswOption = {
  jwtFromRequest: (req) => req.body?.token,
  secretOrKey: config.env.JWT_NEW_PASSW_SECRET
}

const resetPasswStrategy =
  new Strategy(resetPasswOption, async (payload, done) => {
    const { id } = payload
    try {
      user = await UserModel.findById(id)
      if (user) {
        done(null, user)
      } else {
        done(null, false)
      }
    } catch (e) {
      console.log(e)
    }
  })

module.exports = {
  resetPasswEnterStrategy,
  resetPasswStrategy
};
