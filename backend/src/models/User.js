const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
      email: {
            type: String,
            required: true,
            unique: true   // prevent duplicate users
      },
      password: {
            type: String,
            required: true
      },
      role: {
            type: String,
            default: "user"
      }
});

module.exports = mongoose.model("User", userSchema);