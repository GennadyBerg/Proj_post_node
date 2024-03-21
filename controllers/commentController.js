const { CommentModel } = require("../MongoDBModels/Comment.js");
const entityController = require("./entityController.js");

const getAllComments = async (req, res) => await entityController.getAllEntities(req, res, CommentModel);
const getCommentById = async (req, res) => await entityController.getEntityIdById(req, res, CommentModel);
const createNewComment = async (req, res) => await entityController.createNewEntity(req, res, CommentModel);
const putCommentById = async (req, res) => await entityController.putEntityById(req, res, CommentModel);
const patchCommentById = async (req, res) => await entityController.patchEntityById(req, res, CommentModel);
const deleteCommentById = async (req, res, next) => await entityController.deleteEntityById(req, res, CommentModel);

module.exports = { getAllComments, getCommentById, createNewComment, putCommentById, patchCommentById, deleteCommentById };
