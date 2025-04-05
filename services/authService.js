const axios = require("axios");
const userRepository = require("../repositories/userRepository");
const { createToken } = require("../utils/jwt");

const loginWithKakao = async (code) => {
  // access token 요청
  const tokenRes = await axios.post(
    "https://kauth.kakao.com/oauth/token",
    new URLSearchParams({
      grant_type: "authorization_code",
      client_id: process.env.KAKAO_REST_API_KEY,
      redirect_uri: process.env.KAKAO_REDIRECT_URI,
      code,
    }),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );

  const kakaoAccessToken = tokenRes.data.access_token;

  // 사용자 정보 요청
  const kakaoUser = await axios.get("https://kapi.kakao.com/v2/user/me", {
    headers: { Authorization: `Bearer ${kakaoAccessToken}` },
  });

  const { id, kakao_account, properties } = kakaoUser.data;
  const email = kakao_account.email;
  const nickName = properties.nickname;
  const profileImage = properties.profile_image;

  // 사용자 조회/생성
  let user = await userRepository.findByKakaoId(id);
  if (!user) {
    user = await userRepository.createUser({ kakaoId: id, email, nickName, profileImage });
  }

  // JWT 발급
  const token = createToken({ userId: user._id });

  return token;
};

module.exports = { loginWithKakao };
