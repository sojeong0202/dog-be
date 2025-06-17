const userRepository = require("../repositories/userRepository");
const profilePhotoService = require("./profilePhotoService");

const updateProfile = async (userId, updateData) => {
  const { nickName, profilePhotoId } = updateData;

  if (!nickName && !profilePhotoId) {
    throw new Error("수정할 필드를 최소 1개 이상 입력해주세요.");
  }

  const updatePayload = {};
  if (nickName) updatePayload.nickName = nickName;
  if (profilePhotoId) updatePayload.profilePhotoId = profilePhotoId;

  return await userRepository.updateUserById(userId, updatePayload);
};

const getUserWithProfilePhoto = async (userId) => {
  const user = await userRepository.findByIdWithProfilePhoto(userId);
  if (!user) return null;

  const userObj = user.toJSON();
  userObj.profilePhotoUrl = await profilePhotoService.getValidProfileParUrl(
    user.profilePhotoId?._id
  );

  return userObj;
};
module.exports = {
  updateProfile,
  getUserWithProfilePhoto,
};
