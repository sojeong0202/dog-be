const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/multer");
const photoController = require("../controllers/photoController");

router.post("/profile", isAuthenticated, upload.single("file"), photoController.uploadProfilePhoto);
router.post(
  "/answer",
  isAuthenticated,
  upload.array("file", 10),
  photoController.uploadAnswerPhotos
);
module.exports = router;
