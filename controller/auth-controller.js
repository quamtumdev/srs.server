const Register = require("../models/user-modal");
const bcrypt = require("bcryptjs"); // Import bcrypt for password hashing

// *------------------------
// * Registration Logic
// *------------------------
const register = async (req, res) => {
  try {
    const {
      username,
      email,
      phone,
      city,
      password,
      userClass,
      userStream,
      userCourse,
    } = req.body;

    // Check if the user already exists by email or phone
    const userExistByEmail = await Register.findOne({ email: email });
    const userExistByPhone = await Register.findOne({ phone: phone });

    if (userExistByEmail) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    if (userExistByPhone) {
      return res.status(400).json({ msg: "Phone number already exists" });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const userCreated = await Register.create({
      username,
      email,
      phone,
      city,
      password: hashedPassword,
      userClass,
      userStream,
      userCourse,
    });

    // Return the user data excluding the password for security purposes
    res.status(201).json({
      msg: "Registration Successful",
      token: await userCreated.generateToken(),
      userId: userCreated.id.toString(),
    });
  } catch (error) {
    // Log the full error message for debugging purposes
    console.error("Error during registration:", error);
    res
      .status(500)
      .send({
        message: "An error occurred during registration",
        error: error.message,
      });
  }
};

// *------------------------
// * Login Logic
// *------------------------

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // First, check if the user exists by email
    const userExist = await Register.findOne({ email });
    console.log(userExist);

    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Compare the password with the hashed password stored in DB
    const isPasswordValid = await bcrypt.compare(password, userExist.password);

    if (isPasswordValid) {
      // If password is correct, generate token and send response
      res.status(200).json({
        msg: "Login Successful",
        token: await userExist.generateToken(),
        userId: userExist.id.toString(),
      });
    } else {
      // If password is incorrect, send invalid credentials response
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { register, login };
