const UserProfile = require("../models/userProfile.js");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

// Middleware-like function to get user from JWT cookie
const getUserFromToken = (req) => {
  try {
    const token = req.cookies.token;
    if (!token) return null;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id;
  } catch (err) {
    return null;
  }
};

// ---------------- CREATE USER PROFILE ----------------
exports.createUserProfile = async (req, res) => {
  try {
    const userId = getUserFromToken(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { name, age, phone, email, education, stream } = req.body;

    if (!name || !age || !phone || !email || !education) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const profileData = { user: userId, name, age, phone, email, education, stream };

    // Use findOneAndUpdate with upsert to create or update the profile
    const profile = await UserProfile.findOneAndUpdate({ user: userId }, profileData, {
      new: true, // return the updated document
      upsert: true, // create if it doesn't exist
    });

    res.status(201).json({ message: "Profile saved successfully", profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- GET USER PROFILE ----------------
exports.getUserProfile = async (req, res) => {
  try {
    const userId = getUserFromToken(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const profile = await UserProfile.findOne({ user: userId });
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    res.json({ profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
