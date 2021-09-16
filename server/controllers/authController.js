const mongoose = require("mongoose");
const User = mongoose.model("User");
const signToken = require("../utils/signToken");

// Signup Controller
exports.registerNewUser = async (req, res) => {
  const { fullName, userName, password } = req.body;
  try {
    if (!fullName || !userName || !password) {
      return res.status(400).json({
        status: "failed",
        message: "Signup fields should not be empty",
        statusCode: 400,
      });
    }
    const userNameExists = await User.findOne({
      userName,
    });
    if (userNameExists) {
      res.status(409).json({
        status: "failed",
        message: "Username already exists, please try choosing a different one",
        code: 409,
      });
      return userNameExists;
    } else {
      let newUser = new User({ fullName, userName, password });
      newUser = await newUser.save();
      res.status(201).json({
        status: "success",
        message:
          "You are successfully signed up with us, please login with your credentials",
        code: 201,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: "Something went wrong",
    });
  }
};

// Login Controller
exports.loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      res.status(400).json({
        status: "failed",
        message:
          "Empty Credentials, Please provide Username and password to login",
      });
      return true;
    }

    const user = await User.findOne({ userName }).select(
      "+password -createdAt -updatedAt -__v"
    );

    if (!user || !(await user.checkPassword(password, user.password))) {
      res.status(401).json({
        status: "failed",
        message: "Incorrect Username or Password, Please try again!",
      });
      return true;
    }
    const token = signToken(user._id);

    res.status(201).json({
      status: "success",
      message: "Login Successful!",
      token,
      user: {
        userName: user.userName,
        fullName: user.fullName,
        _id: user._id,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: "Something went wrong",
    });
  }
};
