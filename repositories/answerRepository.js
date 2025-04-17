const Answer = require("../models/Answer");

const createAnswer = async (answerData) => {
  const answer = new Answer(answerData);
  return await answer.save();
};

module.exports = {
  createAnswer,
};
