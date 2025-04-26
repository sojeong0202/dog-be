const Answer = require("../models/Answer");

const createAnswer = async (answerData) => {
  const answer = new Answer(answerData);
  return await answer.save();
};

const findAllAnswersByUserId = async (userId) => {
  return await Answer.find({ userId, isDeleted: false }).sort({ createdAt: -1 });
};

const findAnswersByUserAndYearAndMonth = async (userId, year, month) => {
  const startDate = new Date(year, month - 1, 1); // 해당 월의 1일
  const endDate = new Date(year, month, 1); // 다음 달의 1일

  return await Answer.find({
    userId,
    isDeleted: false,
    createdAt: {
      $gte: startDate,
      $lt: endDate,
    },
  }).sort({ createdAt: 1 });
};

const findAnswerSummaryByAnswerId = async (userId, answerId) => {
  return await Answer.findOne(
    { _id: answerId, userId, isDeleted: false },
    { questionText: 1, createdAt: 1 }
  );
};

const findAnswerDetailByAnswerId = async (userId, answerId) => {
  return await Answer.findOne({
    _id: answerId,
    userId,
    isDeleted: false,
  });
};

const updateAnswerByAnswerId = async (userId, answerId, updateData) => {
  return await Answer.findOneAndUpdate(
    { _id: answerId, userId, isDeleted: false },
    { $set: updateData },
    { new: true }
  );
};

const deleteAnswerByAnswerId = async (userId, answerId) => {
  return await Answer.findOneAndUpdate(
    { _id: answerId, userId, isDeleted: false },
    { $set: { isDeleted: true } },
    { new: true }
  );
};

module.exports = {
  createAnswer,
  findAllAnswersByUserId,
  findAnswersByUserAndYearAndMonth,
  findAnswerSummaryByAnswerId,
  findAnswerDetailByAnswerId,
  updateAnswerByAnswerId,
  deleteAnswerByAnswerId,
};
