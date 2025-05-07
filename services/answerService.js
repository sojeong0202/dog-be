const answerRepository = require("../repositories/answerRepository");
const questionRepository = require("../repositories/questionRepository");

const todayKey = require("../utils/todayKey");

const getOrCreateTodayAnswer = async (userId) => {
  const dateKey = todayKey();
  let answer = await answerRepository.findTodayAnswer(userId, dateKey);

  if (answer) return answer;

  const question = await questionRepository.getRandomUnansweredQuestion(userId);
  if (!question) throw new Error("NO_QUESTION_LEFT");

  return await answerRepository.createAnswer({
    userId,
    questionId: question._id,
    questionText: question.text,
    answerText: "",
    photos: [],
    dateKey,
    isDraft: true,
  });
};

const saveTodayAnswer = async (userId, answerText = "", photos = []) => {
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
    photos,
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

const getAnswerDetailByAnswerId = async (userId, answerId) => {
  return await answerRepository.findAnswerDetailByAnswerId(userId, answerId);
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
