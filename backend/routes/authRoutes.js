const express = require("express");
const {
  signup,
  login,
  logout,
  getCurrentUser,
} = require("../controllers/authcontrollers.js");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/current", getCurrentUser);

module.exports = router;
