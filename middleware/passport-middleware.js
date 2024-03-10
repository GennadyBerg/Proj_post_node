const { Strategy, ExtractJwt } = require('passport-jwt');
//import { jwtConfig } from '../config/jwt-config.js'
const config = require('../config/config.json');
const passport = require('passport');
const { UserModel, UserUtils } = require('../MongoDBModels/User.js');

const option = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.env.JWT_SECRET,
}

const refreshOption = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.env.JWT_REFRESH_SECRET,
}

passport.use(
      new Strategy(option, async (payload, done) => {
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
)
passport.use(
      new Strategy(refreshOption, async (payload, done) => {
            const { id } = payload
            try {
                  const user = UserUtils.findUserByid(id);
                  if (user) {
                        done(null, user)
                  } else {
                        done(null, false)
                  }
            } catch (e) {
                  console.log(e)
            }
      })
)

passport.use(
      new Strategy(option, async ({ login }, done) => {
            try {
                  const user = UserUtils.findUserByLogin(login);
                  if (user) {
                        done(null, user)
                  } else {
                        done(null, false)
                  }
            } catch (e) {
                  console.log(e)
            }
      })
)


module.exports = { passport }