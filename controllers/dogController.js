const dogService = require("../services/dogService");
const formatToKST = require("../utils/formatDate");

const addDog = async (req, res) => {
  try {
    const userId = req.user._id;
    const newDog = await dogService.createDog(userId, req.body);

    // 시간 변환
    const formattedDog = {
      ...newDog.toObject(), // mongoose document → plain object
      birthday: formatToKST(newDog.birthday),
      firstMetAt: formatToKST(newDog.firstMetAt),
    };

    res.status(201).json({
      message: "강아지 등록 완료",
      dog: formattedDog,
    });
  } catch (error) {
    console.error("강아지 등록 실패:", error);
    res.status(400).json({
      message: error.message || "강아지 추가 중 예기치 못한 오류 발생",
    });
  }
};

const getMyDog = async (req, res) => {
  try {
    const userId = req.user._id;
    const dog = await dogService.getDogByUserId(userId);

    if (!dog) {
      return res.status(404).json({ message: "등록된 강아지가 없습니다." });
    }

    const formattedDog = {
      ...dog.toObject(),
      birthday: formatToKST(dog.birthday),
      firstMetAt: formatToKST(dog.firstMetAt),
    };

    res.status(200).json({
      message: "강아지 조회 성공",
      dog: formattedDog,
    });
  } catch (error) {
    console.error("강아지 조회 실패:", error);
    res.status(500).json({ message: "강아지 조회 중 예기치 못한 오류 발생" });
  }
};

module.exports = {
  addDog,
  getMyDog,
};
