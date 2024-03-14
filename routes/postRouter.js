const { Router } = require('express');
const { PostModel } = require("../MongoDBModels/Post.js");

const postRouter = new Router();


/*postRouter.post('/posts', async (req, res) => {
    try {
        const postData = req.body;
        const post = await PostModel.create(postData);
        res.status(201).json({ post });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});


postRouter.put('/posts/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const postData = req.body;
        const post = await PostModel.findByIdAndUpdate(postId, postData, { new: true });
        res.status(200).json({ post });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});


postRouter.patch('/posts/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        const postData = req.body;
        const post = await PostModel.findByIdAndUpdate(postId, postData, { new: true });
        res.status(200).json({ post });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});*/


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
