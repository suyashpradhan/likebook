const mongoose = require("mongoose");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "User is not logged in" });
    }

    const { _id } = jwt.verify(token, "my-secret-token-is-very-hard-to-guess");
    const user = await User.findById({ _id }).select("-password -__v");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Not valid user",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = authMiddleware;
