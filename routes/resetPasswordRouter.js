const express = require('express');
const resetPasswordController = require('../controllers/resetPasswordController');
const { passport } = require('../middleware/passport-middleware');

const resetPasswordRouter = express.Router();

resetPasswordRouter.get('/reset-password-init', resetPasswordController.newPasswordInit);
resetPasswordRouter.post('/reset-password-mail', resetPasswordController.newPasswordMail);
resetPasswordRouter.get('/reset-password', passport.authenticate('reset-password-enter', { session: false }), resetPasswordController.newPasswordTokenEnter);
resetPasswordRouter.post('/reset-password', passport.authenticate('reset-password', { session: false }), resetPasswordController.newPasswordTokenSave);

module.exports = resetPasswordRouter;
