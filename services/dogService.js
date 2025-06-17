const dogRepository = require("../repositories/dogRepository");
const profilePhotoService = require("./profilePhotoService");

const createDog = async (userId, dogData) => {
  const { name, birthday, firstMetAt, profilePhotoId } = dogData;

  if (!name || !birthday || !firstMetAt) {
    throw new Error("이름, 생일, 만난 날짜는 모두 필수입니다.");
  }

  const newDog = await dogRepository.createDog({
    user: userId,
    name,
    birthday,
    firstMetAt,
    profilePhotoId,
  });

  return newDog;
};

const getDogByUserId = async (userId) => {
  const dog = await dogRepository.findDogByUserId(userId);
  if (!dog) return null;

  dog.profilePhotoUrl = await profilePhotoService.getValidProfileParUrl(dog.profilePhotoId?._id);
  return dog;
};

const updateDog = async (userId, updateData) => {
  if (
    !updateData.name &&
    !updateData.birthday &&
    !updateData.firstMetAt &&
    !updateData.profilePhotoId
  ) {
    throw new Error("수정할 필드를 최소 1개 이상 입력해주세요.");
  }

  return await dogRepository.updateDogByUserId(userId, updateData);
};

const deleteDogByUser = async (userId) => {
  return await dogRepository.deleteDogByUserId(userId);
};

module.exports = {
  createDog,
  getDogByUserId,
  updateDog,
  deleteDogByUser,
};
