const passport = require('../middleware/passport-middleware');

const resetPassword = (req, res, next) => {
  const user = req.user;
  passport.authenticate('reset-password', (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!user) {
      return res.status(400).json({ message: info.message });
    }

    // Вы можете включить создание токена сессии или JWT здесь

    res.status(200).json({ message: 'Password reset successfully.' });
  })(req, res, next);
};

module.exports = { resetPassword };
