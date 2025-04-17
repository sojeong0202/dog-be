const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/authMiddleware");
const answerController = require("../controllers/answerController");

router.post("/", isAuthenticated, answerController.createAnswer);

module.exports = router;
