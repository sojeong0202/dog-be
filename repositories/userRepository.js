const User = require("../models/User");

const findByKakaoId = (kakaoId) => {
  return User.findOne({ kakaoId });
};

const findById = (userId) => {
  return User.findById(userId);
};

const findByIdWithProfilePhoto = (userId) => {
  return User.findById(userId).populate("profilePhotoId");
};

const createUser = ({ kakaoId, email, nickName, profilePhotoId }) => {
  const newUser = new User({ kakaoId, email, nickName, profilePhotoId });
  return newUser.save();
};

const updateUserById = (userId, updateData) => {
  return User.findByIdAndUpdate(userId, { $set: updateData }, { new: true });
};

module.exports = {
  findByKakaoId,
  findById,
  findByIdWithProfilePhoto,
  createUser,
  updateUserById,
};
