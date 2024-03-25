const { Router } = require("express");
const { passport } = require("../middleware/passport-middleware.js");
const { imageUploader } = require("../controllers/imageUploader.js");

const uploadRouter = new Router();

uploadRouter.post(
  "/upload",
  passport.authenticate("sign-in-token", { session: false }),
  imageUploader.any(),
  async (res, req) => {
    const file = imageUploader.getImage(req);
    if (!file) {
      return res.status(400).send("No file uploaded.");
    }
    // Если файл загружен успешно, возвращаем имя загруженного файла
    res.send(file.filename);
  }
);


module.exports = { uploadRouter };
