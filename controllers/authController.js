const authService = require("../services/authService");
const STATUS = require("../constants/statusCodes");
const ERROR_CODES = require("../constants/errorCodes");
const MESSAGES = require("../constants/messages");

const kakaoLogin = async (req, res) => {
  const { code } = req.body;
  try {
    const token = await authService.loginWithKakao(code);
    res.status(200).json({
      status: STATUS.SUCCESS,
      message: MESSAGES.AUTH_KAKAO_SUCCESS,
      accessToken: token,
    });
  } catch (err) {
    console.error("[AUTH] 카카오 로그인 실패", err.response?.data || err);

    if (err?.response?.status === 401) {
      return res.status(401).json({
        status: STATUS.ERROR,
        error_code: ERROR_CODES.AUTH_KAKAO_UNAUTHORIZED,
        message: MESSAGES.AUTH_KAKAO_UNAUTHORIZED,
      });
    }

    res.status(500).json({
      status: STATUS.ERROR,
      error_code: ERROR_CODES.AUTH_KAKAO_FAILED,
      message: MESSAGES.AUTH_KAKAO_FAILED,
    });
  }
};

module.exports = { kakaoLogin };
