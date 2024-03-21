const { Router } = require('express');
const { passport } = require('../middleware/passport-middleware.js');
const { getAllComments, getCommentById, createNewComment, deleteCommentById, putCommentById, patchCommentById } = require('../controllers/commentController.js');
const { userAuth, extractEntity } = require('../middleware/authorization-middleware.js');

const commentRouter = new Router();

commentRouter.post('/comment', passport.authenticate('sign-in-token', { session: false }), extractEntity, userAuth, createNewComment);
commentRouter.put('/commentspost/:id', passport.authenticate('sign-in-token', { session: false }), extractEntity, userAuth, putCommentById);
commentRouter.delete ('/comment/:id', passport.authenticate('sign-in-token', { session: false }), extractEntity, userAuth, deleteCommentById);
commentRouter.patch('/comment/:id', passport.authenticate('sign-in-token', { session: false }), extractEntity, userAuth, patchCommentById);

commentRouter.get('/comment/:id', getCommentById);
commentRouter.get('/comment',getAllComments);

module.exports = { commentRouter };
