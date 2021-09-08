const mongoose = require("mongoose");
const { default: next } = require("next");
const User = mongoose.model("User");
const passport = require("passport");

// Validation Controller for checking data
exports.validateUserSignup = (req, res, next) => {
  req.sanitizeBody("fullName");
  req.sanitizeBody("userName");
  req.sanitizeBody("password");

  // Name is non-null and is 4 to 10 characters
  req.checkBody("fullName", "Enter your Fullname").notEmpty();
  req
    .checkBody("name", "Fullname must be between 4 and 10 characters")
    .isLength({ min: 4, max: 10 });

  // Username is non-null, valid, and normalized
  req.checkBody("userName", "Enter a valid Username");

  // Password must be non-null, between 4 and 10 characters
  req.checkBody("password", "Enter a valid password").notEmpty();
  req
    .checkBody("password", "Password must be between 4 and 10 characters")
    .isLength({ min: 6, max: 20 });

  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).send(firstError);
  }
  next();
};

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
exports.loginUser = (req, res, next) => {
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

    const user = await User.findOne({ userName }).select("+password");

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
      user,
    });
    next();
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: "Something went wrong",
    });
  }
};

// Authenication Controller
exports.checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};
