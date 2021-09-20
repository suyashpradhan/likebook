import User from "../models/user.model";
import jwt from "jsonwebtoken";

// Authentication Middleware for verifying token
const authMiddleware = (handler) => {
  return async (req, res) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return res
          .status(400)
          .json({ success: false, message: "User is not logged in" });
      }

      const { _id } = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById({ _id }).select("-password -__v");
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Not valid user",
        });
      }
      req.user = user;
      return handler(req, res);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }
  };
};

export default authMiddleware;
