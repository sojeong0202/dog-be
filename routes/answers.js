const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/authMiddleware");
const answerController = require("../controllers/answerController");

router.get("/today", isAuthenticated, answerController.getTodayAnswer);
router.post("/today", isAuthenticated, answerController.saveTodayAnswer);
router.get("/", isAuthenticated, answerController.getAllAnswers);
router.get("/calendar", isAuthenticated, answerController.getAnswersByYearAndMonth);
router.get(
  "/calendar/summary/:answerId",
  isAuthenticated,
  answerController.getAnswerSummaryByAnswerId
);
router.get("/:answerId/detail", isAuthenticated, answerController.getAnswerDetailByAnswerId);
router.patch("/:answerId", isAuthenticated, answerController.updateAnswer);
router.delete("/:answerId", isAuthenticated, answerController.deleteAnswer);

module.exports = router;
