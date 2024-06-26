const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  mobileNumber: {
    type: String,
    required: false,
  },

  faveImages: {
    type: [String],
    required: false,
  },
});

module.exports = mongoose.model("User", userSchema);
