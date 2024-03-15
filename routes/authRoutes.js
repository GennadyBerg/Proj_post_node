const express = require('express');
const authRoutes = express.Router();
const authController = require('../controllers/authController.js');
const validator = require('../Validation/unifyValidator.js');
const { signupSchema, signinSchema } = require('../Validation/authValidationSchemas.js');
const { passport } = require('../middleware/passport-middleware.js');


authRoutes.post('/signup', validator(signupSchema), authController.signup);
authRoutes.post('/signin', passport.authenticate('sign-in-passw', { session: false }), validator(signinSchema), authController.signin);
authRoutes.post('/refresh-token', passport.authenticate("refresh-token", { session: false }), authController.refreshToken);
authRoutes.get('/me', passport.authenticate('sign-in-token', { session: false }), authController.getMe);

module.exports = authRoutes;
