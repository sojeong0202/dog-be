const questionService = require("../services/questionService");
const STATUS = require("../constants/statusCodes");
const ERROR_CODES = require("../constants/errorCodes");
const MESSAGES = require("../constants/messages");

const getUnansweredQuestion = async (req, res) => {
  try {
    const question = await questionService.getUnansweredQuestion(req.user._id);

    if (!question) {
      return res.status(200).json({
        status: STATUS.EMPTY,
        message: MESSAGES.ALL_QUESTIONS_ANSWERED,
      });
    }

    const { _id, text, createdAt, updatedAt } = question;

    res.status(200).json({
      status: STATUS.SUCCESS,
      message: MESSAGES.QUESTION_PROVIDED,
      question: {
        id: _id,
        text,
        createdAt,
        updatedAt,
      },
    });
  } catch (error) {
    console.error("[QUESTION] 질문 제공 실패:", error);
    res.status(500).json({
      status: STATUS.ERROR,
      error_code: ERROR_CODES.QUESTION_PROVIDE_FAILED,
      message: MESSAGES.QUESTION_PROVIDE_FAILED,
    });
  }
};

module.exports = {
  getUnansweredQuestion,
};
