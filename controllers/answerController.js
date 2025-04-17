const answerService = require("../services/answerService");
const STATUS = require("../constants/statusCodes");
const ERROR_CODES = require("../constants/errorCodes");
const MESSAGES = require("../constants/messages");

const createAnswer = async (req, res) => {
  try {
    const { questionId, questionText, answerText } = req.body;

    if (!questionId || !questionText || !answerText) {
      return res.status(400).json({
        status: STATUS.ERROR,
        error_code: ERROR_CODES.ANSWER_VALIDATION_FAILED,
        message: MESSAGES.ANSWER_VALIDATION_FAILED,
      });
    }

    const answer = await answerService.createAnswer(req.user._id, req.body);

    res.status(201).json({
      status: STATUS.SUCCESS,
      message: MESSAGES.ANSWER_CREATED,
      answer: answer.toJSON(),
    });
  } catch (error) {
    console.error("[ANSWER] 응답 저장 실패:", error);
    res.status(500).json({
      status: STATUS.ERROR,
      error_code: ERROR_CODES.ANSWER_CREATE_FAILED,
      message: MESSAGES.ANSWER_CREATE_FAILED,
    });
  }
};

module.exports = {
  createAnswer,
};
