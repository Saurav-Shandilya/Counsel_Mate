const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

module.exports = async function authMiddleware(req, res, next) {
  try {
    let token = req.cookies?.token;

    // If no cookie, check Authorization header
    if (!token && req.headers.authorization) {
      const parts = req.headers.authorization.split(" ");
      if (parts[0] === "Bearer" && parts[1]) token = parts[1];
    }

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user; // attach user to request
    next();
  } catch (err) {
    console.error("AuthMiddleware error:", err);
    res.status(401).json({ message: "Invalid token" });
  }
};
