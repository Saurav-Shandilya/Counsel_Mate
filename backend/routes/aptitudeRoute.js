const express = require("express");
const router = express.Router();
const { generateQuestions, saveScore } = require("../controllers/aptitudeController.js");
const isAuthenticated = require("../middleware/authMiddleware.js");

// Generate aptitude questions
router.get("/generate", isAuthenticated, generateQuestions);

// Save user score
router.post("/score", isAuthenticated, saveScore);

module.exports = router;
