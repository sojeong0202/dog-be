const userService = require("../services/userService");
const ERROR_CODES = require("../constants/errorCodes");
const MESSAGES = require("../constants/messages");

const getUserSummary = async (req, res) => {
  try {
    const user = req.user;

    res.status(200).json({
      message: MESSAGES.USER_FETCHED,
      user: {
        nickName: user.nickName,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error("[USER] 간단 조회 실패:", error);
    res.status(500).json({
      error_code: ERROR_CODES.USER_FETCHED_FAILED,
      message: MESSAGES.USER_FETCHED_FAILED,
    });
  }
};

const getUserDetail = async (req, res) => {
  try {
    const user = req.user; // passport-jwt로 인증된 사용자

    res.status(200).json({
      message: MESSAGES.USER_FETCHED,
      user: {
        email: user.email,
        nickName: user.nickName,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error("[USER] 상세 조회 실패:", error);
    res.status(500).json({
      error_code: ERROR_CODES.USER_FETCHED_FAILED,
      message: MESSAGES.USER_FETCHED_FAILED,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.updateProfile(req.user._id, req.body);

    if (!updatedUser) {
      return res.status(404).json({
        error_code: ERROR_CODES.USER_NOT_FOUND,
        message: MESSAGES.USER_NOT_FOUND,
      });
    }

    res.status(200).json({
      message: MESSAGES.USER_UPDATED,
      user: {
        email: updatedUser.email,
        nickName: updatedUser.nickName,
        profileImage: updatedUser.profileImage,
      },
    });
  } catch (error) {
    console.error("[USER] 수정 실패:", error);
    res.status(500).json({
      error_code: ERROR_CODES.USER_UPDATE_FAILED,
      message: MESSAGES.USER_UPDATE_FAILED,
    });
  }
};

module.exports = {
  getUserSummary,
  getUserDetail,
  updateUser,
};
