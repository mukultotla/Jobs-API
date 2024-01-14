const { z } = require("zod");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // validate email
    // Check 1 - email schema
    const emailSchema = z.string().email();
    emailSchema.parse(email);

    // Check whether email already exists in DB
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    // validate name
    const nameSchema = z
      .string()
      .min(2, { message: "Name must be 2 or more characters long" });
    nameSchema.parse(name);

    // validate password
    const passwordSchema = z
      .string()
      .min(6, { message: "Password must be 6 or more characters long" });
    passwordSchema.parse(password);

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user._id);

    if (user) {
      res.status(StatusCodes.CREATED).json({
        msg: "User created successfully!",
        data: user,
        token,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.json({
      msg: error.message,
    });
  }
};

const login = async (req, res) => {
  res.json({
    msg: "Login controller",
  });
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  register,
  login,
};
