const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/kakao", passport.authenticate("kakao"));

// 위에서 카카오 서버 로그인이 되면, 카카오 redirect url 설정에 따라 이쪽 라우터로 이동
router.get(
  "/auth/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/",
    session: false,
  }),
  (req, res) => {
    const token = req.user; // kakaoStrategy에서 넘긴 우리 서버 토큰
    res.redirect(`http://localhost:8443/?accessToken=${token}`);
  }
);

module.exports = router;
