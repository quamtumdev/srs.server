const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  userId: {
    type: Number,
    unique: true, // Ensuring uniqueness
  },

  userName: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
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
  role: {
    type: [String],
    required: true,
  },
  passwordExpired: {
    type: String,
    required: true,
    default: "No",
  },
  emailVerified: {
    type: String,
    required: true,
    default: "No",
  },
  mobileNumberVerified: {
    type: String,
    required: true,
    default: "No",
  },
  provider: {
    type: String,
    required: true,
    default: "Local",
  },

  createdOn: {
    type: String,
    required: true,
  },

  updatedOn: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
  },
});

const Users = mongoose.model("users", usersSchema);

module.exports = Users;
