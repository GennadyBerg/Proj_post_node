const passport = require('passport');
const { resetPasswEnterStrategy, resetPasswStrategy } = require('./resetPasswordStrategy.js');
const { refresAuthTokenStrategy, signInAuthTokenStrategy, signinPasswStrategy } = require('./authStrategy.js');

passport.use('reset-password-enter', resetPasswEnterStrategy);  
passport.use('reset-password', resetPasswStrategy);  
passport.use('sign-in-passw', signinPasswStrategy);
passport.use('sign-in-token', signInAuthTokenStrategy);
passport.use('refresh-token', refresAuthTokenStrategy);

module.exports = { passport }