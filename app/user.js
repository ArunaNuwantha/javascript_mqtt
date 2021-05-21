const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  deviceID: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    min: 5,
    max: 60,
  },

  patients: {
    type: [],
  },

  containers: {
    type: [],
  },

  history: {
    type: [],
  },

  password: {
    type: String,
    required: true,
    min: 5,
    max: 1024,
  },

  isVerified: { type: Boolean, default: false },
});

const User = mongoose.model("user", userSchema);

module.exports.User = User;
