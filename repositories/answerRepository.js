const Answer = require("../models/Answer");

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

const findTodayAnswer = async (userId, dateKey) => {
  return await Answer.findOne({ userId, dateKey, isDeleted: false });
};

const createAnswer = async ({
  userId,
  questionId,
  questionText,
  answerText,
  photos,
  dateKey,
  isDraft,
}) => {
  return await Answer.create({
    userId,
    questionId,
    questionText,
    answerText,
    photos,
    dateKey,
    isDraft,
  });
};

const upsertTodayAnswer = async ({ userId, dateKey, answerText, photos, isDraft }) => {
  return await Answer.findOneAndUpdate(
    { userId, dateKey },
    {
      $set: {
        answerText,
        photos,
        isDraft,
      },
    },
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
  findTodayAnswer,
  upsertTodayAnswer,
};
