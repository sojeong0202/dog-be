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

const countSubmittedAnswersBeforeOrOnDate = async (userId, dateKey) => {
  return await Answer.countDocuments({
    userId,
    isDraft: false,
    isDeleted: false,
    dateKey: { $lte: dateKey },
  });
};

const findAnswerDetailByAnswerId = async (userId, answerId) => {
  return await Answer.findOne({
    _id: answerId,
    userId,
    isDeleted: false,
  }).populate("photoIds");
};

const updateAnswerByAnswerId = async (userId, answerId, updateData) => {
  return await Answer.findOneAndUpdate(
    { _id: answerId, userId, isDeleted: false },
    { $set: updateData },
    { new: true, runValidators: true }
  ).populate("photoIds");
};

const deleteAnswerByAnswerId = async (userId, answerId) => {
  return await Answer.findOneAndUpdate(
    { _id: answerId, userId, isDeleted: false },
    { $set: { isDeleted: true } },
    { new: true }
  );
};

const findTodayAnswer = async (userId, dateKey) => {
  return await Answer.findOne({ userId, dateKey, isDeleted: false }).populate("photoIds");
};

const createAnswer = async ({
  userId,
  questionId,
  questionText,
  answerText,
  photoIds,
  dateKey,
  isDraft,
  mood,
}) => {
  return await Answer.create({
    userId,
    questionId,
    questionText,
    answerText,
    photoIds,
    dateKey,
    isDraft,
    mood,
  });
};

const upsertTodayAnswer = async ({ userId, dateKey, answerText, photoIds, isDraft, mood }) => {
  const updateFields = {
    answerText,
    photoIds,
    isDraft,
  };
  if (mood !== undefined) updateFields.mood = mood;

  return await Answer.findOneAndUpdate(
    { userId, dateKey },
    { $set: updateFields },
    { new: true, runValidators: true }
  );
};

const findTodayAnswerWithPhotoUrls = async (userId, dateKey) => {
  const answer = await Answer.findOne({ userId, dateKey, isDeleted: false }).populate("photoIds");

  if (!answer) return null;

  const plain = answer.toJSON();
  plain.photoUrls = answer.photoIds.map((photo) => photo.uri);
  return plain;
};

module.exports = {
  createAnswer,
  findAllAnswersByUserId,
  findAnswersByUserAndYearAndMonth,
  findAnswerSummaryByAnswerId,
  countSubmittedAnswersBeforeOrOnDate,
  findAnswerDetailByAnswerId,
  updateAnswerByAnswerId,
  deleteAnswerByAnswerId,
  findTodayAnswer,
  upsertTodayAnswer,
  findTodayAnswerWithPhotoUrls,
};
