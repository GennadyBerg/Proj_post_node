const express = require('express');
const authController = require('../controllers/authController');
const { passport } = require('../middleware/passport-middleware');

const resetPasswordRouter = express.Router();

resetPasswordRouter.get('/reset-password-init', authController.newPasswordInit);
resetPasswordRouter.post('/reset-password-mail', authController.newPasswordMail);
resetPasswordRouter.get('/reset-password', passport.authenticate('reset-password-enter', { session: false }), authController.newPasswordTokenEnter);
resetPasswordRouter.post('/reset-password', passport.authenticate('reset-password', { session: false }), authController.newPasswordTokenSave);

module.exports = resetPasswordRouter;
