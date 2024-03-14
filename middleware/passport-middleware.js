const { Strategy, ExtractJwt } = require('passport-jwt');
//import { jwtConfig } from '../config/jwt-config.js'
const config = require('../config/config.json');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { UserModel, UserUtils } = require('../MongoDBModels/User.js');
const { resetPasswEnterStrategy, resetPasswStrategy } = require('./resetPasswordStrategy.js');

passport.use('reset-password-enter', resetPasswEnterStrategy);  
passport.use('reset-password', resetPasswStrategy);  
  

const option = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.env.JWT_SECRET,
}

const refreshOption = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.env.JWT_REFRESH_SECRET,
}

passport.use(
      'post-use',
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
/*//////////////////////////////
passport.use('reset-password', new LocalStrategy(
      {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
      },
      async (req, email, password, done) => {
            try {
                  const user = await User.findOne({ email });

                  if (!user) {
                        return done(null, false, { message: 'No user found with that email address.' });
                  }

                  user.password = password;

                  await user.save();

                  return done(null, user);
            } catch (error) {
                  return done(error);
            }
      }
));*/



module.exports = { passport }