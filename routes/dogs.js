const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/authMiddleware");
const dogController = require("../controllers/dogController");

router.post("/", isAuthenticated, dogController.addMyDog);
router.get("/", isAuthenticated, dogController.getMyDogSummary);
router.get("/detail", isAuthenticated, dogController.getMyDogDetail);
router.patch("/", isAuthenticated, dogController.updateMyDog);
router.delete("/", isAuthenticated, dogController.deleteMyDog);

module.exports = router;
