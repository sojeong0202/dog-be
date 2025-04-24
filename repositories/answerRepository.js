const Answer = require("../models/Answer");

const createAnswer = async (answerData) => {
  const answer = new Answer(answerData);
  return await answer.save();
};

const findAllAnswersByUserId = async (userId) => {
  return await Answer.find({ userId, isDeleted: false }).sort({ createdAt: -1 });
};

module.exports = {
  createAnswer,
  findAllAnswersByUserId,
};
