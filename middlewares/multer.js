const multer = require("multer");
const path = require("path");

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB 제한
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const ext = path.extname(file.originalname).toLowerCase();
    const mimeType = allowedTypes.test(file.mimetype);
    const extName = allowedTypes.test(ext);
    if (mimeType && extName) {
      return cb(null, true);
    }
    cb(new Error("Only image files are allowed"));
  },
});

module.exports = upload;
