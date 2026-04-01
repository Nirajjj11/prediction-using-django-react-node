const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const predictRoutes = require("./routes/predictRoutes");

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/predict", predictRoutes);

// Test route
app.get("/", (req, res) => {
      res.send("API Running");
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
});