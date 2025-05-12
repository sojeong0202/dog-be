const dogService = require("../services/dogService");
const profilePhotoService = require("../services/profilePhotoService");
const formatToKST = require("../utils/formatDate");
const STATUS = require("../constants/statusCodes");
const ERROR_CODES = require("../constants/errorCodes");
const MESSAGES = require("../constants/messages");

const addMyDog = async (req, res) => {
  try {
    const newDog = await dogService.createDog(req.user._id, req.body);

    // 시간 변환
    const formattedDog = {
      ...newDog.toJSON(),
      birthday: formatToKST(newDog.birthday),
      firstMetAt: formatToKST(newDog.firstMetAt),
    };

    res.status(201).json({
      status: STATUS.SUCCESS,
      message: MESSAGES.DOG_CREATED,
      dog: formattedDog,
    });
  } catch (error) {
    console.error("[DOG] 등록 실패:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        status: STATUS.ERROR,
        error_code: ERROR_CODES.DOG_CREATE_VALIDATION_FAILED,
        message: MESSAGES.DOG_CREATE_VALIDATION_FAILED,
      });
    }

    return res.status(500).json({
      status: STATUS.ERROR,
      error_code: ERROR_CODES.DOG_CREATE_SERVER_FAILED,
      message: MESSAGES.DOG_CREATE_FAILED,
    });
  }
};

const getMyDogSummary = async (req, res) => {
  try {
    const dog = await dogService.getDogByUserId(req.user._id);

    if (!dog) {
      return res.status(404).json({
        status: STATUS.EMPTY,
        error_code: ERROR_CODES.DOG_NOT_FOUND,
        message: MESSAGES.DOG_NOT_FOUND,
      });
    }

    const { id, name, profilePhotoUrl, togetherFor } = dog;

    res.status(200).json({
      status: STATUS.SUCCESS,
      message: MESSAGES.DOG_FETCHED,
      dog: {
        id,
        name,
        profilePhotoUrl,
        togetherFor,
      },
    });
  } catch (error) {
    console.error("[DOG] 간단 조회 실패:", error);
    res.status(500).json({
      status: STATUS.ERROR,
      error_code: ERROR_CODES.DOG_FETCHED_FAILED,
      message: MESSAGES.DOG_FETCHED_FAILED,
    });
  }
};

const getMyDogDetail = async (req, res) => {
  try {
    const dog = await dogService.getDogByUserId(req.user._id);

    if (!dog) {
      return res.status(404).json({
        status: STATUS.EMPTY,
        error_code: ERROR_CODES.DOG_NOT_FOUND,
        message: MESSAGES.DOG_NOT_FOUND,
      });
    }

    const dogObj = dog.toJSON();
    dogObj.profilePhotoUrl = await profilePhotoService.getValidProfileParUrl(
      dog.profilePhotoId?._id
    );

    const formattedDog = {
      ...dogObj,
      birthday: formatToKST(dogObj.birthday),
      firstMetAt: formatToKST(dogObj.firstMetAt),
    };

    res.status(200).json({
      status: STATUS.SUCCESS,
      message: MESSAGES.DOG_FETCHED,
      dog: formattedDog,
    });
  } catch (error) {
    console.error("[DOG] 상세 조회 실패:", error);
    res.status(500).json({
      status: STATUS.ERROR,
      error_code: ERROR_CODES.DOG_FETCHED_FAILED,
      message: MESSAGES.DOG_FETCHED_FAILED,
    });
  }
};

const updateMyDog = async (req, res) => {
  try {
    const updatedDog = await dogService.updateDog(req.user._id, req.body);

    if (!updatedDog) {
      return res.status(404).json({
        status: STATUS.EMPTY,
        error_code: ERROR_CODES.DOG_NOT_FOUND_FOR_UPDATE,
        message: MESSAGES.DOG_NOT_FOUND_FOR_UPDATE,
      });
    }

    const formattedDog = {
      ...updatedDog.toJSON(),
      birthday: formatToKST(updatedDog.birthday),
      firstMetAt: formatToKST(updatedDog.firstMetAt),
      createdAt: formatToKST(updatedDog.createdAt),
      updatedAt: formatToKST(updatedDog.updatedAt),
    };

    res.status(200).json({
      status: STATUS.SUCCESS,
      message: MESSAGES.DOG_UPDATED,
      dog: formattedDog,
    });
  } catch (error) {
    console.error("[DOG] 수정 실패:", error);
    res.status(500).json({
      status: STATUS.ERROR,
      error_code: ERROR_CODES.DOG_UPDATE_FAILED,
      message: MESSAGES.DOG_UPDATE_FAILED,
    });
  }
};

const deleteMyDog = async (req, res) => {
  try {
    const result = await dogService.deleteDogByUser(req.user._id);

    if (!result) {
      return res.status(404).json({
        status: STATUS.EMPTY,
        error_code: ERROR_CODES.DOG_NOT_FOUND_FOR_DELETE,
        message: MESSAGES.DOG_NOT_FOUND_FOR_DELETE,
      });
    }

    res.sendStatus(204);
  } catch (error) {
    console.error("[DOG] 삭제 실패:", error);
    res.status(500).json({
      status: STATUS.ERROR,
      error_code: ERROR_CODES.DOG_DELETE_FAILED,
      message: MESSAGES.DOG_DELETE_FAILED,
    });
  }
};

module.exports = {
  addMyDog,
  getMyDogSummary,
  getMyDogDetail,
  updateMyDog,
  deleteMyDog,
};
