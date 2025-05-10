const AnswerPhoto = require("../models/AnswerPhoto");

// 응답 이미지 도큐먼트 생성
const createAnswerPhoto = async ({ answerId, objectName, uri, parExpiresAt }) => {
  return await AnswerPhoto.create({ answerId, objectName, uri, parExpiresAt });
};

// 특정 응답에 연결된 이미지 목록 조회
const findPhotosByAnswerId = async (answerId) => {
  return await AnswerPhoto.find({ answerId }).sort({ createdAt: 1 });
};

// 객체 이름으로 조회 (PAR 재발급 등)
const findByObjectName = async (objectName) => {
  return await AnswerPhoto.findOne({ objectName });
};

// 만료된 이미지 찾기
const findExpiredPhotos = async () => {
  return await AnswerPhoto.find({ parExpiresAt: { $lte: new Date() } });
};

module.exports = {
  createAnswerPhoto,
  findPhotosByAnswerId,
  findByObjectName,
  findExpiredPhotos,
};
