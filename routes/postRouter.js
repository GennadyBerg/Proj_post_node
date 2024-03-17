const { Router } = require('express');
const { PostModel } = require("../MongoDBModels/Post.js");
const { passport } = require('../middleware/passport-middleware.js');

const postRouter = new Router();


postRouter.post('/posts', passport.authenticate('post-use', { session: false }),
    async (req, res) => {
        try {
            const postData = req.body;
            const post = await PostModel.create(postData);
            post.owner_id = req.user._id;
            res.status(201).json({ post });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    });


postRouter.put('/posts/:id', passport.authenticate('post-use', { session: false }),
    async (req, res) => {
        try {
            const postId = req.params.id;

            let postToUpdate = await PostModel.findById(req.params.id).exec();
            if (!postToUpdate)
                return res.status(404).send({ message: 'Post not found' });

            const tempPost = new PostModel(req.body);

            const { _id, __v, ...rest } = tempPost._doc;
            const postData = rest;
            postData.owner_id = req.user._id;

            const post = await PostModel.findByIdAndUpdate(postId, postData, { new: true });
            if (post)
                return res.status(200).json({ post });
            else
                return res.status(404).send({ message: 'Post not found' });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    });


postRouter.patch('/posts/:id', passport.authenticate('post-use', { session: false }),
    async (req, res) => {
        try {
            const postId = req.params.id;
            const postData = req.body;
            const { owner_id, ...rest } = postData;
            const post = await PostModel.findByIdAndUpdate(postId, rest, { new: true });
            if (post)
                return res.status(200).json({ post });
            else
                return res.status(404).send({ message: 'Post not found' });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    });


postRouter.get('/posts/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await PostModel.findById(postId);
        res.status(200).json({ post });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = { postRouter };
