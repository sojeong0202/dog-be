const questionRepository = require("../repositories/questionRepository");

const getUnansweredQuestion = async (userId) => {
  return await questionRepository.getRandomUnansweredQuestion(userId);
};

module.exports = {
  getUnansweredQuestion,
};
