const answerService = require("../services/answerService");
const formatToKST = require("../utils/formatDate");
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

const getAllAnswers = async (req, res) => {
  try {
    const answers = await answerService.getAllAnswersByUser(req.user._id);

    if (answers.length === 0) {
      return res.status(200).json({
        status: STATUS.EMPTY,
        message: MESSAGES.ANSWER_LIST_EMPTY,
        answers: [],
      });
    }

    const formatted = answers.map((a) => ({
      answerId: a._id,
      questionText: a.questionText,
      createdAt: formatToKST(a.createdAt),
      updatedAt: formatToKST(a.updatedAt),
    }));

    res.status(200).json({
      status: STATUS.SUCCESS,
      message: MESSAGES.ANSWER_FETCHED_ALL,
      answers: formatted,
    });
  } catch (error) {
    console.error("[ANSWER] 전체 응답 조회 실패:", error);
    res.status(500).json({
      status: STATUS.ERROR,
      error_code: ERROR_CODES.ANSWER_FETCH_ALL_FAILED,
      message: MESSAGES.ANSWER_FETCH_ALL_FAILED,
    });
  }
};

const getAnswersByYearAndMonth = async (req, res) => {
  try {
    const { year, month } = req.query;

    if (!year || !month) {
      return res.status(400).json({
        status: STATUS.ERROR,
        error_code: ERROR_CODES.ANSWER_QUERY_VALIDATION_FAILED,
        message: MESSAGES.ANSWER_QUERY_VALIDATION_FAILED,
      });
    }

    const answers = await answerService.getAnswersByYearAndMonth(req.user._id, year, month);

    if (!answers.length) {
      return res.status(200).json({
        status: STATUS.EMPTY,
        message: MESSAGES.ANSWER_THIS_MONTH_LIST_EMPTY,
        answers: [],
      });
    }

    const result = answers.map((a) => ({
      id: a._id,
      date: new Date(a.createdAt).getDate(),
    }));

    res.status(200).json({
      status: STATUS.SUCCESS,
      message: MESSAGES.ANSWER_MONTHLY_FETCHED,
      answers: result,
    });
  } catch (error) {
    console.error("[ANSWER] 월별 조회 실패:", error);
    res.status(500).json({
      status: STATUS.ERROR,
      error_code: ERROR_CODES.ANSWER_FETCH_MONTHLY_FAILED,
      message: MESSAGES.ANSWER_FETCH_MONTHLY_FAILED,
    });
  }
};

const getAnswerSummaryByAnswerId = async (req, res) => {
  try {
    const { answerId } = req.params;

    const answer = await answerService.getAnswerSummaryByAnswerId(req.user._id, answerId);

    if (!answer) {
      return res.status(404).json({
        status: STATUS.EMPTY,
        error_code: ERROR_CODES.ANSWER_SUMMARY_NOT_FOUND,
        message: MESSAGES.ANSWER_SUMMARY_NOT_FOUND,
      });
    }

    const { _id, questionText, createdAt } = answer;

    res.status(200).json({
      status: STATUS.SUCCESS,
      message: MESSAGES.ANSWER_SUMMARY_FETCHED,
      answer: {
        id: _id,
        questionText,
        createdAt: formatToKST(createdAt),
      },
    });
  } catch (error) {
    console.error("[ANSWER] 간단 응답 조회 실패:", error);
    res.status(500).json({
      status: STATUS.ERROR,
      error_code: ERROR_CODES.ANSWER_FETCH_SUMMARY_FAILED,
      message: MESSAGES.ANSWER_FETCH_SUMMARY_FAILED,
    });
  }
};

module.exports = {
  createAnswer,
  getAllAnswers,
  getAnswersByYearAndMonth,
  getAnswerSummaryByAnswerId,
};
