const profilePhotoService = require("../services/profilePhotoService");
const answerPhotoService = require("../services/answerPhotoService");
const STATUS = require("../constants/statusCodes");
const ERROR_CODES = require("../constants/errorCodes");
const MESSAGES = require("../constants/messages");

// 프로필 사진 업로드
const uploadProfilePhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: STATUS.ERROR,
        error_code: ERROR_CODES.PHOTO_VALIDATION_FAILED,
        message: MESSAGES.PHOTO_VALIDATION_FAILED,
      });
    }

    const parUrl = await profilePhotoService.uploadProfilePhoto(req.file, req.user._id);

    return res.status(201).json({
      status: STATUS.SUCCESS,
      message: MESSAGES.PHOTO_PROFILE_UPLOADED,
      parUrl,
    });
  } catch (error) {
    console.error("[PHOTO] 프로필 사진 업로드 실패:", error);
    return res.status(500).json({
      status: STATUS.ERROR,
      error_code: ERROR_CODES.PHOTO_UPLOAD_FAILED,
      message: MESSAGES.PHOTO_UPLOAD_FAILED,
    });
  }
};

// 응답 사진 업로드 (다중 파일 지원)
const uploadAnswerPhotos = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        status: STATUS.ERROR,
        error_code: ERROR_CODES.PHOTO_VALIDATION_FAILED,
        message: MESSAGES.PHOTO_VALIDATION_FAILED,
      });
    }

    const result = await answerPhotoService.uploadAnswerPhotos(req.files);

    return res.status(201).json({
      status: STATUS.SUCCESS,
      message: MESSAGES.PHOTO_ANSWER_UPLOADED,
      photos: result,
    });
  } catch (error) {
    console.error("[PHOTO] 응답 사진 업로드 실패:", error);
    return res.status(500).json({
      status: STATUS.ERROR,
      error_code: ERROR_CODES.PHOTO_UPLOAD_FAILED,
      message: MESSAGES.PHOTO_UPLOAD_FAILED,
    });
  }
};

module.exports = {
  uploadProfilePhoto,
  uploadAnswerPhotos,
};
