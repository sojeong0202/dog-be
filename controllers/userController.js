const getMyProfile = async (req, res) => {
  try {
    const user = req.user; // passport-jwt로 인증된 사용자

    res.status(200).json({
      email: user.email,
      nickName: user.nickName,
      profileImage: user.profileImage,
    });
  } catch (error) {
    console.error("프로필 조회 실패:", error);
    res.status(500).json({ message: "프로필 조회 중 예기치 않은 오류 발생" });
  }
};

module.exports = {
  getMyProfile,
};
