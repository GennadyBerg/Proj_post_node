const multer = require("multer");
const fs = require("fs");
const path = require("path");
const _ = require("lodash");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Путь к папке для сохранения файлов
  },
  filename: function (req, file, cb) {
    // Генерация уникального имени файла на основе post._id и текущей даты
    const uniqueFilename = `${req.body?.imageId ?? "img"}_${Date.now()}${path.extname(
      file.originalname
    )}`;
    cb(null, uniqueFilename);
  },
});

// Фильтр для загружаемых файлов (в данном случае принимаем только изображения)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed!"), false);
  }
};

// Middleware для загрузки файла с помощью multer
const imageUploader = multer({ storage: storage, fileFilter: fileFilter });

imageUploader.getImage = (req) => req.files?.find((f) => f.fieldname === "image");
imageUploader.getImageFileName = (req) => {
  const imageFile = imageUploader.getImage(req);
  const res = imageFile ? `${imageFile.destination}${imageFile.filename}` : null;
  return res;
}

module.exports = { imageUploader };
