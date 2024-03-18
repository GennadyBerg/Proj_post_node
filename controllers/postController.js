const { ApiError } = require("../middleware/ApiError.js");
const { default: mongoose } = require('mongoose');
const { PostSchema, PostModel } = require("../MongoDBModels/Post.js");

const Post = mongoose.model('Post', PostSchema);


const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
    return posts;

  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Error fetching posts' });
  }
}

const putPostById = async (req, res) => {
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
};

const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await PostModel.findById(postId);
    res.status(200).json({ post });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

const patchPostById = async (req, res) => {
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
}

const deletePostById = async (req, res, next) => {
  try {
    const result = await PostModel.deleteOne({ _id: req.params.id });

    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

const createNewPost = async (req, res) => {
  try {
    const postData = req.body;
    const post = await PostModel.create(postData);
    post.owner_id = req.user._id;
    res.status(201).json({ post });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}


module.exports = { getAllPosts, getPostById, createNewPost, deletePostById, putPostById, patchPostById };
