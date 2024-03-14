const express = require('express');
const authRoutes = express.Router();
const authController = require('../controllers/authController.js');
const validator = require('../Validation/unifyValidator.js');
const { signupSchema, signinSchema } = require('../Validation/authValidationSchemas.js');
const { passport } = require('../middleware/passport-middleware.js');
const { newPasswordTokenCheck } = require("../controllers/authController");


authRoutes.post('/signup', validator(signupSchema), authController.signup);
authRoutes.post('/signin', validator(signinSchema), authController.signin);
authRoutes.post('/refresh-token', authController.refreshToken);

authRoutes.get('/me', passport.authenticate('jwt', { session: false }), authController.getMe);

module.exports = authRoutes;
