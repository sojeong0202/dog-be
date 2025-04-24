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

module.exports = {
  createAnswer,
  getAllAnswersByUser,
};
