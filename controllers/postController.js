const { PostModel } = require("../MongoDBModels/Post.js");
const entityController = require("./entityController.js");

const getAllPosts = async (req, res) => await entityController.getAllEntities(req, res, PostModel);
const getPostById = async (req, res) => await entityController.getEntityIdById(req, res, PostModel);

const createNewPost = async (req, res) => await entityController.createNewEntity(req, res, PostModel);
const putPostById = async (req, res) => await entityController.putEntityById(res, PostModel);
const patchPostById = async (req, res) => await entityController.patchEntityById(req, res, PostModel);
const deletePostById = async (req, res, next) => await entityController.deleteEntityById(req, res, PostModel);

module.exports = { getAllPosts, getPostById, createNewPost, deletePostById, putPostById, patchPostById };
