const { passport } = require('../middleware/passport-middleware.js');
const userController  = require('../controllers/userController.js');
const { Router } = require('express');

const userRoutes = new Router();

userRoutes.delete('/users/:id', passport.authenticate('sign-in-token', { session: false }),  userController.deleteUserById);
userRoutes.get('/me', passport.authenticate('sign-in-token', { session: false }), userController.getMe);
userRoutes.get('/users', passport.authenticate('sign-in-token', { session: false }), userController.getAllUsers);

module.exports = userRoutes;
