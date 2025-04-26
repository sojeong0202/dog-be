const answerRepository = require("../repositories/answerRepository");

const createAnswer = async (userId, answerData) => {
  const newAnswer = {
    userId,
    questionId: answerData.questionId,
    questionText: answerData.questionText,
    answerText: answerData.answerText,
    photos: answerData.photos || [],
  };

  return await answerRepository.createAnswer(newAnswer);
};

const getAllAnswersByUser = async (userId) => {
  return await answerRepository.findAllAnswersByUserId(userId);
};

const getAnswersByYearAndMonth = async (userId, year, month) => {
  return await answerRepository.findAnswersByUserAndYearAndMonth(userId, year, month);
};

const getAnswerSummaryByAnswerId = async (userId, answerId) => {
  return await answerRepository.findAnswerSummaryByAnswerId(userId, answerId);
};

const getAnswerDetailByAnswerId = async (userId, answerId) => {
  return await answerRepository.findAnswerDetailByAnswerId(userId, answerId);
};

const updateAnswer = async (userId, answerId, updateData) => {
  return await answerRepository.updateAnswerByAnswerId(userId, answerId, updateData);
};

module.exports = {
  createAnswer,
  getAllAnswersByUser,
  getAnswersByYearAndMonth,
  getAnswerSummaryByAnswerId,
  getAnswerDetailByAnswerId,
  updateAnswer,
};
