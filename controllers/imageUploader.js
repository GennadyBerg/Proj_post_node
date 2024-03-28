const multer = require("multer");
const fs = require("fs");
const path = require("path");
const _ = require("lodash");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); 
  },
  filename: function (req, file, cb) {
    const uniqueFilename = `${req.body?.imageId ?? "img"}_${Date.now()}${path.extname(
      file.originalname
    )}`;
    cb(null, uniqueFilename);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed!"), false);
  }
};
const imageUploader = multer({ storage: storage, fileFilter: fileFilter });

imageUploader.getImage = (req) => req.files?.find((f) => f.fieldname === "image");
imageUploader.getImageFileName = (req) => {
  const imageFile = imageUploader.getImage(req);
  const res = imageFile ? `${imageFile.destination}${imageFile.filename}` : null;
  return res;
}

module.exports = { imageUploader };
