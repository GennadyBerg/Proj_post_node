const { Router } = require('express');
const { passport } = require('../middleware/passport-middleware.js');
const { getAllPosts, getPostById, createNewPost, deletePostById, putPostById, patchPostById } = require('../controllers/postController.js');
const { userAuth, extractEntity } = require('../middleware/authorization-middleware.js');

const postRouter = new Router();

postRouter.post('/posts', passport.authenticate('sign-in-token', { session: false }), extractEntity, userAuth, createNewPost);
postRouter.put('/posts/:id', passport.authenticate('sign-in-token', { session: false }), extractEntity, userAuth, putPostById);
postRouter.delete ('/posts/:id', passport.authenticate('sign-in-token', { session: false }), extractEntity, userAuth, deletePostById);
postRouter.patch('/posts/:id', passport.authenticate('sign-in-token', { session: false }), extractEntity, userAuth, patchPostById);

postRouter.get('/posts/:id', getPostById);
postRouter.get('/posts',getAllPosts);

module.exports = { postRouter,  };
