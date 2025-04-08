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

module.exports = {
  createDog,
  findDogByUserId,
};
