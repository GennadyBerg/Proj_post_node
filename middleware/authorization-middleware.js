//super-admin
//+ CRUD admins/users, posts
//admin+user
//+ CRUD users, posts
//- CRUD admin users
//user
//+ CROD own items (Posts/Comments) exclude delete/enable/disable on itself
//- create users
//user+admin+superadmin
//login/logout/resfresh/restore password

const { request } = require("express");
const { UserModel } = require("../MongoDBModels/User");
const { PostModel } = require("../MongoDBModels/Post");
const { ForbiddenError } = require("./ApiError");
const { CategoryModel } = require("../MongoDBModels/Category");
const { CommentModel } = require("../MongoDBModels/Comment");

const RolesEnum = {
      user: 1,
      admin: 2,
      superAdmin: 3
};

const adminSuperAuth = (req, res, next) => {
      const user = req.user;
      if (user?.role != RolesEnum.superAdmin || user.id === req.entity._id)
            return next(new ForbiddenError());
      return next();
}


const adminAuth = (req, res, next) => {
      const user = req.user;
      if (user?.role < RolesEnum.admin)
            return next(new ForbiddenError());
      try {
            checkOwnerAuth(req, user.role);
            return next();
      }
      catch (error) {
            return next(new ForbiddenError());
      }
}

const userAuth = (req, res, next) => {
      const user = req.user;
      if (user?.role < RolesEnum.user)
            return next(new ForbiddenError());
      try {
            checkOwnerAuth(req);
            return next();
      }
      catch (error) {
            return next(error);
      }
}

const checkOwnerAuth = (req) => {
      const user = req.user;
      const entity = req.entity;
      if (entity?.owner_id &&
            entity.owner_id !== user._id) {
            if (req.entityType === UserModel.modelName) {
                  if ((!(user.role >= RolesEnum.admin) &&
                        user.role !== RolesEnum.superAdmin)) {
                        throw new ForbiddenError();
                  }
            }
            else if (req.entityType === PostModel.modelName) {
                  throw new ForbiddenError();
            }
      }
}

const isUserReq = (req) => {
      return isUserEntityReq(req) ||
            req.url.startsWith("/users");
}
const isUserEntityReq = (req) => {
      return req.url === "/me" ||
            req.url === "/users/:id";
}

const isEntityReq = (req, baseRoute) => {
      return isPostEntityReq(req, baseRoute) ||
            req.url.startsWith(`/${baseRoute}`);
}
const isEntityInstanceReq = (req, baseRoute) => {
      return req.url === `/${baseRoute}/` + req.params.id;
}


const extractEntity = async (req, res, next) => {
      if (isUserReq(req)) {
            req.entityType = UserModel.modelName;
            if (isUserEntityReq(req))
                  await setEntityInRequest(req, UserModel);
      }
      else if (isEntityReq(req, "post")) {
            req.entityType = PostModel.modelName;
            if (isEntityInstanceReq(req, "post"))
                  await setEntityInRequest(req, PostModel);
      }
      else if (isEntityReq(req, "category")) {
            req.entityType = CategoryModel.modelName;
            if (isEntityInstanceReq(req, "category"))
                  await setEntityInRequest(req, CategoryModel);
      }
      else if (isEntityReq(req, "comment")) {
            req.entityType = CommentModel.modelName;
            if (isEntityInstanceReq(req, "comment"))
                  await setEntityInRequest(req, CommentModel);
      }
      return next();
}

const setEntityInRequest = async (req, model) => {
      const id = req.url === "/me" ? req.user._id : req.params.id;
      if (req.method !== "POST")
            request.dbEntity = await model.findById(id);
      request.entity = req.body;
      request.entity._id = id;
      if (request.dbEntity) {
            let ownerId = request.dbEntity.owner_id;
            if (!ownerId && isUserReq(req))
                  ownerId = id;
            request.entity.owner_id = ownerId;
      }
}

module.exports = { adminSuperAuth, adminAuth, userAuth, extractEntity };
