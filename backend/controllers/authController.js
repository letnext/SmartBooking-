import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// === REGISTER USER ===
export const registerUser = async (req, res) => {
  try {
    console.log("📩 Register Request Body:", req.body);

    const { fullName, phoneNumber, email, password, confirmPassword } = req.body;

    if (!fullName || !phoneNumber || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ fullName, phoneNumber, email, password });
    await newUser.save();

    console.log("✅ User Registered:", newUser.email);

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "Registration successful",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        phoneNumber: newUser.phoneNumber,
        email: newUser.email,
        role: newUser.role,
      },
      token,
    });
  } catch (err) {
    console.error("❌ Register Error:", err);
    res.status(500).json({ message: "Server error during registration", error: err.message });
  }
};

// === LOGIN USER ===
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Load Admin Credentials SAFELY inside function
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL?.trim();
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD?.trim();

    console.log("ENV ADMIN:", ADMIN_EMAIL, ADMIN_PASSWORD);
    console.log("USER ENTERED:", email, password);

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    // ADMIN LOGIN
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminToken = jwt.sign(
        { email, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.status(200).json({
        message: "Admin login successful",
        user: { fullName: "Hospital Admin", email, role: "admin" },
        token: adminToken,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: `Welcome back, ${user.fullName}!`,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ message: "Server error during login", error: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};