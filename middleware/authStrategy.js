const { Strategy, ExtractJwt } = require('passport-jwt');
const config = require('../config/config.js');
const { UserUtils } = require('../MongoDBModels/User.js');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcrypt");

const signinPasswStrategy = new LocalStrategy(
      async (username, password, done) => {
            try {
                  const user = await UserUtils.findUserByUserName(username);
                  if (user && bcrypt.compareSync(password, user.password)) {
                        done(null, user)
                  } else {
                        done(null, false)
                  }
            } catch (e) {
                  console.log(e)
            }

      }
);

const option = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.env.jwt.JWT_SECRET,
}
const signInAuthTokenStrategy = new Strategy(option, async (payload, done) => await authById(payload, done));

const refreshOption = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.env.jwt.JWT_REFRESH_SECRET,
}
const refresAuthTokenStrategy = new Strategy(refreshOption, async (payload, done) => await authById(payload, done));

const authById = async (payload, done) => {
      const { id } = payload
      try {
            const user = await UserUtils.findUserByid(id);
            if (user) {
                  done(null, user)
            } else {
                  done(null, false)
            }
      } catch (e) {
            console.log(e)
      }
}

module.exports = { signinPasswStrategy, signInAuthTokenStrategy, refresAuthTokenStrategy };