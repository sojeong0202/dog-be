const ProfilePhoto = require("../models/ProfilePhoto");

// 프로필 사진 생성
const createProfilePhoto = async ({ userId, objectName, uri, parExpiresAt }) => {
  return await ProfilePhoto.create({ userId, objectName, uri, parExpiresAt });
};

// 사용자 ID로 최신 프로필 사진 조회
const findLatestProfilePhotoByUserId = async (userId) => {
  return await ProfilePhoto.findOne({ userId }).sort({ createdAt: -1 });
};

// 사용자 ID로 모든 프로필 사진 삭제 (교체 시)
const deleteAllProfilePhotosByUserId = async (userId) => {
  return await ProfilePhoto.deleteMany({ userId });
};

module.exports = {
  createProfilePhoto,
  findLatestProfilePhotoByUserId,
  deleteAllProfilePhotosByUserId,
};
