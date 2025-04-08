const dogRepository = require("../repositories/dogRepository");

const createDog = async (userId, dogData) => {
  const { name, birthday, firstMetAt, photo } = dogData;

  if (!name || !birthday || !firstMetAt) {
    throw new Error("이름, 생일, 만난 날짜는 모두 필수입니다.");
  }

  const newDog = await dogRepository.createDog({
    user: userId,
    name,
    birthday,
    firstMetAt,
    photo,
  });

  return newDog;
};

module.exports = {
  createDog,
};
