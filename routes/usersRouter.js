const { passport } = require('../middleware/passport-middleware.js');
const userController  = require('../controllers/userController.js');
const { Router } = require('express');
const { extractEntity, userAuth, adminSuperAuth, adminAuth } = require('../middleware/authorization-middleware.js');

const userRoutes = new Router();

userRoutes.get('/me', passport.authenticate('sign-in-token', { session: false }), extractEntity, userAuth, userController.getMe);
userRoutes.delete('/users/:id', extractEntity, adminSuperAuth, passport.authenticate('admin-role', { session: false }),  userController.deleteUserById);
userRoutes.get('/users', extractEntity, adminAuth, passport.authenticate('admin-role', { session: false }), userController.getAllUsers);

module.exports = userRoutes;
