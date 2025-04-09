const userService = require("../services/userService");

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

const updateMyProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const updatedUser = await userService.updateProfile(userId, req.body);

    if (!updatedUser) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    res.status(200).json({
      message: "프로필 수정 완료",
      user: {
        email: updatedUser.email,
        nickName: updatedUser.nickName,
        profileImage: updatedUser.profileImage,
      },
    });
  } catch (error) {
    console.error("프로필 수정 실패:", error);
    res.status(500).json({ message: "프로필 수정 중 오류 발생" });
  }
};

module.exports = {
  getMyProfile,
  updateMyProfile,
};
