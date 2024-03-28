const { Router } = require('express');
const { passport } = require('../middleware/passport-middleware.js');
const { extractEntity, adminAuth } = require('../middleware/authorization-middleware.js');
const { createNewCategory, putCategoryById, deleteCategoryById, patchCategoryById, getCategoryById, getAllCategories } = require('../controllers/categoryController.js');

const categoryRoutes = new Router();

categoryRoutes.post('/category', passport.authenticate('sign-in-token', { session: false }), extractEntity, adminAuth, createNewCategory);
categoryRoutes.put('/category/:id', passport.authenticate('sign-in-token', { session: false }), extractEntity, adminAuth, putCategoryById);
categoryRoutes.delete('/category/:id', passport.authenticate('sign-in-token', { session: false }), extractEntity, adminAuth, deleteCategoryById);
categoryRoutes.patch('/category/:id', passport.authenticate('sign-in-token', { session: false }), extractEntity, adminAuth, patchCategoryById);

categoryRoutes.get('/category/:id', getCategoryById);
categoryRoutes.get('/category', getAllCategories);

module.exports = { categoryRoutes };
