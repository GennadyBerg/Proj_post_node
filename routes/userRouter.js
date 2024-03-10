const { Router } = require("express");
const { UserModel } = require("../MongoDBModels/User");
  
const userRouter = new Router();

userRouter.post("/user", async (req, res) => {
  try {
    const userData = req.body;

    const user = await UserModel.create(userData);

    res.status(201).json({
      user,
    });
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
});

userRouter.get("/user", async (req, res) => {
  try {
    const id = req.query.id;

    const user = await UserModel.findById(id);

    res.status(201).json({
      user,
    });
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
});

module.exports = { userRouter };
