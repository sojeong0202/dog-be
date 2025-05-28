const answerRepository = require("../repositories/answerRepository");
const questionRepository = require("../repositories/questionRepository");
const answerPhotoService = require("../services/answerPhotoService");
const todayKey = require("../utils/todayKey");

const getAnswerOrderByDateKey = async (userId, dateKey) => {
  return await answerRepository.countSubmittedAnswersBeforeOrOnDate(userId, dateKey);
};

const getOrCreateTodayAnswer = async (userId) => {
  const dateKey = todayKey();
  let answer = await answerRepository.findTodayAnswerWithPhotoUrls(userId, dateKey);

  if (!answer) {
    const question = await questionRepository.getRandomUnansweredQuestion(userId);
    if (!question) throw new Error("NO_QUESTION_LEFT");

    await answerRepository.createAnswer({
      userId,
      questionId: question._id,
      questionText: question.text,
      answerText: "",
      photoIds: [],
      dateKey,
      isDraft: true,
      mood: null,
    });

    answer = await answerRepository.findTodayAnswerWithPhotoUrls(userId, dateKey);
  }

  let order = await getAnswerOrderByDateKey(userId, dateKey);
  if (answer.isDraft === true) {
    order = order + 1;
  }
  answer.order = order;

  return answer;
};

const saveTodayAnswer = async (userId, answerText = "", photoIds = [], mood = undefined) => {
  const dateKey = todayKey();
  const isDraft = !answerText.trim();

  const answer = await answerRepository.findTodayAnswer(userId, dateKey);
  if (!answer) {
    throw new Error("ANSWER_NOT_FOUND_FOR_SAVE");
  }

  return await answerRepository.upsertTodayAnswer({
    userId,
    dateKey,
    answerText,
    photoIds,
    isDraft,
    mood,
  });
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
  const answer = await answerRepository.findAnswerDetailByAnswerId(userId, answerId);
  if (!answer) return null;

  const answerObj = answer.toJSON();
  answerObj.photoUrls = await Promise.all(
    answer.photoIds.map((photoDoc) => answerPhotoService.getValidAnswerParUrl(photoDoc._id))
  );
  delete answerObj.photoIds;

  let order = await getAnswerOrderByDateKey(userId, answer.dateKey);
  if (answer.isDraft === true && answer.dateKey === todayKey()) {
    order = order + 1;
  }
  answerObj.order = order;

  return answerObj;
};

const updateAnswer = async (userId, answerId, updateData) => {
  return await answerRepository.updateAnswerByAnswerId(userId, answerId, updateData);
};

const deleteAnswer = async (userId, answerId) => {
  return await answerRepository.deleteAnswerByAnswerId(userId, answerId);
};

module.exports = {
  getOrCreateTodayAnswer,
  saveTodayAnswer,
  getAllAnswersByUser,
  getAnswersByYearAndMonth,
  getAnswerSummaryByAnswerId,
  getAnswerDetailByAnswerId,
  updateAnswer,
  deleteAnswer,
};
