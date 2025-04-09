const User = require("../models/User");

const updateProfile = async (userId, updateData) => {
  const { nickName, profileImage } = updateData;

  if (!nickName && !profileImage) {
    throw new Error("수정할 필드를 최소 1개 이상 입력해주세요.");
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: { nickName, profileImage } },
    { new: true }
  );

  return updatedUser;
};

module.exports = {
  updateProfile,
};
