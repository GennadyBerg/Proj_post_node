const { Router } = require('express');
const { passport } = require('../middleware/passport-middleware.js');
const { getAllPosts, getPostById, createNewPost, deletePostById, putPostById, patchPostById } = require('../controllers/postController.js');

const postRouter = new Router();

postRouter.post('/posts', passport.authenticate('post-use', { session: false }), createNewPost);


postRouter.put('/posts/:id', passport.authenticate('post-use', { session: false }), putPostById);

postRouter.delete ('/posts/:id', passport.authenticate('post-use', { session: false }),deletePostById);

postRouter.patch('/posts/:id', passport.authenticate('post-use', { session: false }), patchPostById);


postRouter.get('/posts/:id', getPostById);


postRouter.get('/allposts/',getAllPosts);

module.exports = { postRouter,  };
