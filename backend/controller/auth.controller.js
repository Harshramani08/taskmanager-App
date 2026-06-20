import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "please enter all values" });
    }

    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(400).json({ message: "User Already Exist!!" });
    }

    const hashPass = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashPass });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(201).json({
      message: "Registered Successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (e) {
    res.status(500).json({ message: "Register Error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please enter a values" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const comparePass = await bcrypt.compare(password, user.password);

    if (!comparePass) {
      return res.status(400).json({ message: "Password Not matched" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json({ message: "Login Successfully", token });
  } catch (e) {
    console.log("Login failed");
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie("token");

  res.status(200).json({
    message: "Logout successfully",
  });
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User fetched successfully",
      user,
    });
  } catch (e) {
    res.status(500).json({
      message: "Get user error",
    });
  }
};
