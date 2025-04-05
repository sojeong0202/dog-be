const User = require("../models/User");

const findByKakaoId = (kakaoId) => {
  return User.findOne({ kakaoId });
};

const createUser = ({ kakaoId, email, nickName, profileImage }) => {
  const newUser = new User({ kakaoId, email, nickName, profileImage });
  return newUser.save();
};

module.exports = {
  findByKakaoId,
  createUser,
};
