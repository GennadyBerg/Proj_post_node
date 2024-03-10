const { Router }=require('express');
const { PostModel }= require ("../MongoDBModels/Post.js");

const postRouter = new Router()

postRouter.post('/post', async (req, res) => {

    try {
        const postData = req.body

        const post = await PostModel.create(postData)

        res.status(201).json({
            post
        })
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }

})

postRouter.get('/post', async (req, res) => {

    try {

        const id = req.query.id;

        const post = await PostModel.findById(id);

        res.status(201).json({
            post
        })
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }

})

module.exports ={postRouter};