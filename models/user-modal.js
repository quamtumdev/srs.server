const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userClass: {
    type: String,
    required: true,
  },
  userStream: {
    type: String,
    required: true,
  },
  userCourse: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// JWT generation function
userSchema.methods.generateToken = function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRET_KEY, // Ensure this key is in your .env file
      {
        expiresIn: "30d", // Token expires in 30 days
      }
    );
  } catch (e) {
    console.error(e);
    throw new Error("Error generating token");
  }
};

const User = mongoose.model("registers", userSchema);

module.exports = User;
