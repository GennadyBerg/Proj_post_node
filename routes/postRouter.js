const { Router } = require('express');
const { passport } = require('../middleware/passport-middleware.js');
const { getAllPosts, getPostById, createNewPost, deletePostById, putPostById, patchPostById } = require('../controllers/postController.js');
const { userAuth, extractEntity, adminAuth } = require('../middleware/authorization-middleware.js');
const { imageUploader } = require('../controllers/imageUploader.js');

const postRouter = new Router();

postRouter.post('/posts', passport.authenticate('sign-in-token', { session: false }),  extractEntity, userAuth, imageUploader.any(),  createNewPost);
postRouter.put('/posts/:id', passport.authenticate('sign-in-token', { session: false }), extractEntity, userAuth, imageUploader.any(), putPostById);
postRouter.patch('/posts/:id', passport.authenticate('sign-in-token', { session: false }), extractEntity, userAuth, imageUploader.any(), patchPostById);
postRouter.delete ('/posts/:id', passport.authenticate('sign-in-token', { session: false }), extractEntity, userAuth, deletePostById);


postRouter.get('/posts/:id', getPostById);
postRouter.get('/posts',getAllPosts);

module.exports = { postRouter,  };
