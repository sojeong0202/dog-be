const STATUS = require("../constants/statusCodes");
const ERROR_CODES = require("../constants/errorCodes");
const MESSAGES = require("../constants/messages");

const handleAuthError = (err, req, res, next) => {
  if (err?.name === "UnauthorizedError") {
    return res.status(401).json({
      status: STATUS.ERROR,
      error_code: ERROR_CODES.AUTH_UNAUTHORIZED,
      message: MESSAGES.AUTH_UNAUTHORIZED,
    });
  }
  next(err);
};

module.exports = { handleAuthError };
