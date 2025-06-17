const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/authMiddleware");
const questionController = require("../controllers/questionController");

router.get("/next", isAuthenticated, questionController.getUnansweredQuestion);

module.exports = router;
