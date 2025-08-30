const express = require("express");
const { createUserProfile, getUserProfile } = require("../controllers/userProfileController.js");
const authMiddleware = require("../middleware/authMiddleware.js"); // must exist

const router = express.Router();

router.post("/profile", authMiddleware, createUserProfile);
router.get("/profile", authMiddleware, getUserProfile);

module.exports = router;
