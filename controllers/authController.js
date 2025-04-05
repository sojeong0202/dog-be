const authService = require("../services/authService");

const kakaoLogin = async (req, res) => {
  const { code } = req.body;
  try {
    const token = await authService.loginWithKakao(code);
    res.json({ accessToken: token });
  } catch (err) {
    console.error("카카오 로그인 실패", err.response?.data || err);
    res.status(401).json({ message: "카카오 인증 실패" });
  }
};

module.exports = { kakaoLogin };
