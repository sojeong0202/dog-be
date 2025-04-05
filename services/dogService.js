const dogRepository = require("../repositories/dogRepository");

const createDog = async (userId, dogData) => {
  const { name, age, firstMetAt, photo } = dogData;

  if (!name) throw new Error("강아지 이름을 입력해주세요");

  const newDog = await dogRepository.createDog({
    user: userId,
    name,
    age,
    firstMetAt,
    photo,
  });

  return newDog;
};

module.exports = {
  createDog,
};
