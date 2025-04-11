const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { isAuthenticated } = require("../middlewares/authMiddleware");

router.get("/", isAuthenticated, userController.getUserSummary);
router.get("/detail", isAuthenticated, userController.getUserDetail);
router.patch("/", isAuthenticated, userController.updateUser);

module.exports = router;
