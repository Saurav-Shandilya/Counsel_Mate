const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const userProfileRoutes = require("./routes/userProfileRoute.js");
const aptitudeRoutes = require("./routes/aptitudeRoute.js");
const cookieParser = require("cookie-parser");


require("dotenv").config();

const authRoutes = require("./routes/authRoutes.js");

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS for all routes and pre-flight checks
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true, // allows cookies/session
})); // Enable pre-flight for all routes

// // Middleware
app.use(express.json());
app.use(cookieParser());


// ✅ Add session middleware here
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecretkey", // use a strong secret in .env
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.ATLAS_URI, // same as connectDB
      ttl: 24 * 60 * 60, // 1 day
    }),
    cookie: {
      httpOnly: true,
      secure: false, // set true if using HTTPS
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// Connect MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userProfileRoutes);
app.use("/api/aptitude", aptitudeRoutes);


app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server is running on port: ${port}`);
});
