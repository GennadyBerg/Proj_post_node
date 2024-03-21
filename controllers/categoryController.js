const { CategoryModel } = require("../MongoDBModels/Category.js");
const entityController = require("./entityController.js");

const getAllCategories = async (req, res) => await entityController.getAllEntities(req, res, CategoryModel);
const getCategoryById = async (req, res) => await entityController.getEntityIdById(req, res, CategoryModel);
const createNewCategory = async (req, res) => await entityController.createNewEntity(req, res, CategoryModel);
const putCategoryById = async (req, res) => await entityController.putEntityById(res, CategoryModel);
const patchCategoryById = async (req, res) => await entityController.patchEntityById(req, res, CategoryModel);
const deleteCategoryById = async (req, res, next) => await entityController.deleteEntityById(req, res, CategoryModel);

module.exports = { getAllCategories, getCategoryById, createNewCategory, putCategoryById, patchCategoryById, deleteCategoryById };
