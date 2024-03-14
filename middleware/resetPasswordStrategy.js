const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../MongoDBModels/User.js'); // Подставьте свой путь к модели пользователя

/*passport.use('reset-password', new LocalStrategy(
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

module.exports = passport;
