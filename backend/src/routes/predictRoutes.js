const express = require("express");
const router = express.Router();

const predictController = require("../controllers/predictController");
const authMiddleware = require("../middleware/authMiddleware");

// Protected route
router.post("/", authMiddleware, predictController.predict);

module.exports = router;