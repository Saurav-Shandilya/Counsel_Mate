const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Not authorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { _id: decoded.id };
    next();
  } catch {
    res.status(401).json({ message: "Token invalid" });
  }
};
