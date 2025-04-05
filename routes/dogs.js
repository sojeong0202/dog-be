const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/authMiddleware");
const dogController = require("../controllers/dogController");

// 강아지 등록
router.post("/", isAuthenticated, dogController.addDog);

module.exports = router;
