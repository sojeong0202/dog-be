const express = require("express");
const router = express.Router();
const Dog = require("../models/Dog");
const { isAuthenticated } = require("../middlewares/authMiddleware");

// 강아지 추가
router.post("/", isAuthenticated, async (req, res) => {
  try {
    const { name, age, firstMetAt, photo } = req.body;

    if (!name) {
      return res.status(400).json({ message: "강아지 이름을 입력해주세요" });
    }

    const newDog = new Dog({
      user: req.user._id,
      name,
      age,
      firstMetAt,
      photo,
    });

    await newDog.save();

    res.status(201).json({ message: "강아지 추가 완료", dog: newDog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "강아지 추가 중 예기치 못한 오류 발생" });
  }
});

module.exports = router;
