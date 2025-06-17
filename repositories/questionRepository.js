const Question = require("../models/Question");
const Answer = require("../models/Answer");

const getRandomUnansweredQuestion = async (userId) => {
  const answeredQuestionIds = await Answer.find({ userId }).distinct("questionId");
  const [question] = await Question.aggregate([
    { $match: { _id: { $nin: answeredQuestionIds } } },
    { $sample: { size: 1 } },
  ]);
  return question;
};

module.exports = {
  getRandomUnansweredQuestion,
};
