const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {
      try {
            const { email, password } = req.body;

            if (!email || !password) {
                  return res.status(400).json({ msg: "All fields required" });
            }

            // Check duplicate
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                  return res.status(400).json({ msg: "User already exists" });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Save user
            await User.create({
                  email,
                  password: hashedPassword
            });

            res.json({ msg: "User registered successfully" });

      } catch (err) {
            res.status(500).json({ msg: "Server error" });
      }
};

// LOGIN
exports.login = async (req, res) => {
      try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });
            if (!user) {
                  return res.status(400).json({ msg: "User not found" });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                  return res.status(400).json({ msg: "Invalid credentials" });
            }

            // Generate JWT
            const token = jwt.sign(
                  { id: user._id, role: user.role },
                  process.env.JWT_SECRET,
                  { expiresIn: "1d" }
            );

            res.json({
                  token,
                  user: {
                        email: user.email,
                        role: user.role
                  }
            });

      } catch (err) {
            res.status(500).json({ msg: "Server error" });
      }
};