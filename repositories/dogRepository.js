const Dog = require("../models/Dog");

// 강아지 저장
const createDog = async (dogData) => {
  const dog = new Dog(dogData);
  return await dog.save();
};

// 강아지 조회
const findDogByUserId = async (userId) => {
  return await Dog.findOne({ user: userId });
};

// 강아지 수정
const updateDogByUserId = async (userId, updateData) => {
  return await Dog.findOneAndUpdate({ user: userId }, { $set: updateData }, { new: true });
};

module.exports = {
  createDog,
  findDogByUserId,
  updateDogByUserId,
};
