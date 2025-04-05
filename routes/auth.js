const express = require("express");
const router = express.Router();
const { kakaoLogin } = require("../controllers/authController");

router.post("/auth/kakao", kakaoLogin);

module.exports = router;
