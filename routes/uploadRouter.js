const { Router } = require("express");
const { passport } = require("../middleware/passport-middleware.js");
const { imageUploader } = require("../controllers/imageUploader.js");

const uploadRouter = new Router();

uploadRouter.post(
  "/upload",
  passport.authenticate("sign-in-token", { session: false }),
  imageUploader.any(),
  async (req, res) => {
    const fileName = imageUploader.getImageFileName(req);
    if (!fileName) {
      return res.status(400).send("No file uploaded.");
    }
        res.status(200).json({ fileName });
  }
);

module.exports = { uploadRouter };
