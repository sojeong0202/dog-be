const Dog = require("../models/Dog");

// 강아지 저장
const createDog = async (dogData) => {
  const dog = new Dog(dogData);
  return await dog.save();
};

module.exports = {
  createDog,
};
