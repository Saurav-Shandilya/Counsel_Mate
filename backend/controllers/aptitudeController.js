// controllers/aptitudeController.js
const Aptitude = require("../models/Aptitude.js"); // for saving scores

// ---------------- GENERATE DUMMY QUESTIONS ----------------
const generateQuestions = async (req, res) => {
  try {
    const questions = [
      {
        question: "What is 2 + 2?",
        options: ["2", "3", "4", "5"],
        answer: "4",
      },
      {
        question: "What is the capital of India?",
        options: ["Delhi", "Mumbai", "Kolkata", "Chennai"],
        answer: "Delhi",
      },
      {
        question: "Which number is prime?",
        options: ["4", "6", "9", "7"],
        answer: "7",
      },
      {
        question: "5 * 3 = ?",
        options: ["15", "20", "10", "8"],
        answer: "15",
      },
      {
        question: "What comes next in series: 2, 4, 6, ?",
        options: ["7", "8", "9", "10"],
        answer: "8",
      },
      {
        question: "If a train travels 60 km in 1 hour, how far will it travel in 3 hours?",
        options: ["120 km", "150 km", "180 km", "200 km"],
        answer: "180 km",
      },
      {
        question: "Which one is a mammal?",
        options: ["Shark", "Dolphin", "Crocodile", "Frog"],
        answer: "Dolphin",
      },
      {
        question: "What is 15 ÷ 3?",
        options: ["3", "5", "6", "4"],
        answer: "5",
      },
      {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: "Mars",
      },
      {
        question: "Find the odd one out: Apple, Banana, Carrot, Mango",
        options: ["Apple", "Banana", "Carrot", "Mango"],
        answer: "Carrot",
      },
    ];

    res.json({ questions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- SAVE USER SCORE ----------------
const saveScore = async (req, res) => {
  try {
    const { score } = req.body;
    const userId = req.user._id; // from authMiddleware

    const result = await Aptitude.create({ user: userId, score });
    res.status(201).json({ message: "Score saved successfully", result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { generateQuestions, saveScore };
