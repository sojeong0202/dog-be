const ProfilePhoto = require("../models/ProfilePhoto");

const createKakaoProfilePhoto = async (kakaoProfileUrl) => {
  return await ProfilePhoto.create({
    uri: kakaoProfileUrl,
    source: "kakao",
  });
};

const createInternalProfilePhoto = async ({ objectName, uri, parExpiresAt }) => {
  return await ProfilePhoto.create({
    objectName,
    uri,
    parExpiresAt,
    source: "internal",
  });
};

const findPhotoById = async (photoId) => {
  return await ProfilePhoto.findById(photoId);
};

module.exports = {
  createKakaoProfilePhoto,
  createInternalProfilePhoto,
  findPhotoById,
};
