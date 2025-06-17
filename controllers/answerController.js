const answerService = require("../services/answerService");
const formatToKST = require("../utils/formatDate");
const STATUS = require("../constants/statusCodes");
const ERROR_CODES = require("../constants/errorCodes");
const MESSAGES = require("../constants/messages");

const getTodayAnswer = async (req, res) => {
  try {
    const answer = await answerService.getOrCreateTodayAnswer(req.user._id);

    res.status(200).json({
      status: STATUS.SUCCESS,
      message: MESSAGES.ANSWER_FETCHED_TODAY,
      question: {
        id: answer.questionId,
        text: answer.questionText,
      },
      answer: {
        id: answer.id,
        answerText: answer.answerText,
        photoUrls: answer.photoUrls || [],
        isDraft: answer.isDraft,
        mood: answer.mood,
        order: answer.order,
      },
    });
  } catch (error) {
    console.error("[ANSWER] 오늘 질문/응답 조회 실패:", error);
    const isNoQuestion = error.message === "NO_QUESTION_LEFT";
    return res.status(isNoQuestion ? 404 : 500).json({
      status: STATUS.ERROR,
      error_code: isNoQuestion
        ? ERROR_CODES.QUESTION_PROVIDE_FAILED
        : ERROR_CODES.ANSWER_FETCH_TODAY_FAILED,
      message: isNoQuestion ? MESSAGES.ALL_QUESTIONS_ANSWERED : MESSAGES.ANSWER_FETCH_TODAY_FAILED,
    });
  }
};

const saveTodayAnswer = async (req, res) => {
  try {
    const { answerText = "", photoIds = [], mood } = req.body;

    const answer = await answerService.saveTodayAnswer(req.user._id, answerText, photoIds, mood);

    res.status(201).json({
      status: STATUS.SUCCESS,
      message: MESSAGES.ANSWER_CREATED,
      answer: answer.toJSON(),
    });
  } catch (error) {
    console.error("[ANSWER] 오늘 응답 저장 실패:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        status: STATUS.ERROR,
        error_code: ERROR_CODES.ANSWER_VALIDATION_FAILED,
        message: MESSAGES.ANSWER_MOOD_VALIDATION_FAILED,
      });
    }

    const isNotFound = error.message === "ANSWER_NOT_FOUND_FOR_SAVE";
    return res.status(isNotFound ? 404 : 500).json({
      status: STATUS.ERROR,
      error_code: isNotFound ? ERROR_CODES.ANSWER_NOT_FOUND : ERROR_CODES.ANSWER_DRAFT_SAVE_FAILED,
      message: isNotFound ? MESSAGES.ANSWER_NOT_FOUND : MESSAGES.ANSWER_DRAFT_SAVE_FAILED,
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
      isDraft: a.isDraft,
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
        error_code: ERROR_CODES.ANSWER_NOT_FOUND,
        message: MESSAGES.ANSWER_NOT_FOUND,
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

const getAnswerDetailByAnswerId = async (req, res) => {
  try {
    const { answerId } = req.params;
    const userId = req.user._id;

    const answer = await answerService.getAnswerDetailByAnswerId(userId, answerId);

    if (!answer) {
      return res.status(404).json({
        status: STATUS.EMPTY,
        error_code: ERROR_CODES.ANSWER_NOT_FOUND,
        message: MESSAGES.ANSWER_NOT_FOUND,
      });
    }

    res.status(200).json({
      status: STATUS.SUCCESS,
      message: MESSAGES.ANSWER_FETCHED_DETAIL,
      answer: {
        ...answer,
        order: answer.order,
        mood: answer.mood,
        createdAt: formatToKST(answer.createdAt),
        updatedAt: formatToKST(answer.updatedAt),
      },
    });
  } catch (error) {
    console.error("[ANSWER] 상세 조회 실패:", error);
    res.status(500).json({
      status: STATUS.ERROR,
      error_code: ERROR_CODES.ANSWER_FETCH_DETAIL_FAILED,
      message: MESSAGES.ANSWER_FETCH_DETAIL_FAILED,
    });
  }
};

const updateAnswer = async (req, res) => {
  try {
    const { answerId } = req.params;
    const updateData = req.body;

    // 1. 응답 존재 여부 먼저 확인
    const answer = await answerService.getAnswerDetailByAnswerId(req.user._id, answerId);
    if (!answer) {
      return res.status(404).json({
        status: STATUS.EMPTY,
        error_code: ERROR_CODES.ANSWER_NOT_FOUND,
        message: MESSAGES.ANSWER_NOT_FOUND,
      });
    }

    // 2. 수정할 필드가 없는 경우 기존 응답 그대로 반환
    if (Object.keys(updateData).length === 0) {
      return res.status(200).json({
        status: STATUS.SUCCESS,
        message: MESSAGES.ANSWER_NO_UPDATE_FIELD,
        answer: {
          ...answer,
          createdAt: formatToKST(answer.createdAt),
          updatedAt: formatToKST(answer.updatedAt),
        },
      });
    }

    // 3. 실제 수정
    const updatedAnswer = await answerService.updateAnswer(req.user._id, answerId, updateData);

    return res.status(200).json({
      status: STATUS.SUCCESS,
      message: MESSAGES.ANSWER_UPDATED,
      answer: {
        ...updatedAnswer.toJSON(),
        createdAt: formatToKST(updatedAnswer.createdAt),
        updatedAt: formatToKST(updatedAnswer.updatedAt),
      },
    });
  } catch (error) {
    console.error("[ANSWER] 응답 수정 실패:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        status: STATUS.ERROR,
        error_code: ERROR_CODES.ANSWER_VALIDATION_FAILED,
        message: MESSAGES.ANSWER_MOOD_VALIDATION_FAILED,
      });
    }

    return res.status(500).json({
      status: STATUS.ERROR,
      error_code: ERROR_CODES.ANSWER_UPDATE_FAILED,
      message: MESSAGES.ANSWER_UPDATE_FAILED,
    });
  }
};

const deleteAnswer = async (req, res) => {
  try {
    const deletedAnswer = await answerService.deleteAnswer(req.user._id, req.params.answerId);

    if (!deletedAnswer) {
      return res.status(404).json({
        status: STATUS.EMPTY,
        error_code: ERROR_CODES.ANSWER_NOT_FOUND,
        message: MESSAGES.ANSWER_NOT_FOUND,
      });
    }

    res.sendStatus(204);
  } catch (error) {
    console.error("[ANSWER] 삭제 실패:", error);
    res.status(500).json({
      status: STATUS.ERROR,
      error_code: ERROR_CODES.ANSWER_DELETE_FAILED,
      message: MESSAGES.ANSWER_DELETE_FAILED,
    });
  }
};

module.exports = {
  getTodayAnswer,
  saveTodayAnswer,
  getAllAnswers,
  getAnswersByYearAndMonth,
  getAnswerSummaryByAnswerId,
  getAnswerDetailByAnswerId,
  updateAnswer,
  deleteAnswer,
};
