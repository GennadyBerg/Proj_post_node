const { Router } = require('express');
const { passport } = require('../middleware/passport-middleware.js');
const { getAllPosts, getPostById, createNewPost, deletePostById, putPostById, patchPostById } = require('../controllers/postController.js');
const { userAuth, extractEntity, adminAuth } = require('../middleware/authorization-middleware.js');
const multer = require('multer');
const os = require('os');

const postRouter = new Router();
const upload = multer({ dest: os.tmpdir() });

postRouter.post('/posts', passport.authenticate('sign-in-token', { session: false }), upload.single('file'), extractEntity, userAuth, adminAuth, createNewPost);
postRouter.put('/posts/:id', passport.authenticate('sign-in-token', { session: false }), extractEntity, userAuth, putPostById);
postRouter.patch('/posts/:id', passport.authenticate('sign-in-token', { session: false }), extractEntity, userAuth, patchPostById);
postRouter.delete ('/posts/:id', passport.authenticate('sign-in-token', { session: false }), extractEntity, userAuth, deletePostById);


postRouter.get('/posts/:id', getPostById);
postRouter.get('/posts',getAllPosts);

module.exports = { postRouter,  };
