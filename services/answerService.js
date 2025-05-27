const answerRepository = require("../repositories/answerRepository");
const questionRepository = require("../repositories/questionRepository");
const answerPhotoService = require("../services/answerPhotoService");
const todayKey = require("../utils/todayKey");

const getOrCreateTodayAnswer = async (userId) => {
  const dateKey = todayKey();
  let answer = await answerRepository.findTodayAnswerWithPhotoUrls(userId, dateKey);

  if (answer) return answer;

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
  });

  return await answerRepository.findTodayAnswerWithPhotoUrls(userId, dateKey);
};

const saveTodayAnswer = async (userId, answerText = "", photoIds = []) => {
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

const getAnswerOrderForToday = async (userId, dateKey) => {
  const count = await answerRepository.countSubmittedAnswersExcludingDate(userId, dateKey);
  return count + 1;
};

const getAnswerDetailByAnswerId = async (userId, answerId) => {
  const answer = await answerRepository.findAnswerDetailByAnswerId(userId, answerId);
  if (!answer) return null;

  const answerObj = answer.toJSON();
  answerObj.photoUrls = await Promise.all(
    answer.photoIds.map((photoDoc) => answerPhotoService.getValidAnswerParUrl(photoDoc._id))
  );
  delete answerObj.photoIds;

  answerObj.order = await getAnswerOrderForToday(userId, answer.dateKey);

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
