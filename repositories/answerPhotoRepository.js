const AnswerPhoto = require("../models/AnswerPhoto");

const createAnswerPhoto = async ({ objectName, uri, parExpiresAt }) => {
  return await AnswerPhoto.create({ objectName, uri, parExpiresAt });
};

const findPhotoById = async (id) => {
  return await AnswerPhoto.findById(id);
};

module.exports = {
  createAnswerPhoto,
  findPhotoById,
};
