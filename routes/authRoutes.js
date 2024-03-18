const authController = require('../controllers/authController.js');
const validator = require('../Validation/unifyValidator.js');
const { signupSchema, signinSchema } = require('../Validation/authValidationSchemas.js');
const { passport } = require('../middleware/passport-middleware.js');
const { Router } = require('express');

const authRoutes = new Router();

authRoutes.post('/signup', validator(signupSchema), authController.signup);
authRoutes.post('/signin', passport.authenticate('sign-in-passw', { session: false }), validator(signinSchema), authController.signin);
authRoutes.post('/refresh-token', passport.authenticate("refresh-token", { session: false }), authController.refreshToken);

module.exports = authRoutes;
