const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/authMiddleware");
const dogController = require("../controllers/dogController");

router.post("/", isAuthenticated, dogController.addDog);
router.get("/", isAuthenticated, dogController.getMyDog);
router.patch("/", isAuthenticated, dogController.updateMyDog);

module.exports = router;
