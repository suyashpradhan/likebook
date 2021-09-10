const mongoose = require("mongoose");
const User = require("../models/user.model");

exports.fetchAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("_id userName fullName");
    res.status(200).json({ status: "success", users });
  } catch (error) {
    console.log(error);
  }
};

exports.getAuthUser = (req, res) => {
  if (!req.isAuthUser) {
    res.status(403).json({
      message: "You are unauthenticated. Please sign in or sign up",
    });
    return res.redirect("/signin");
  }
  res.json(req.user);
};

exports.getUserById = async (req, res, next, id) => {
  const user = await User.findOne({ _id: id });
  req.profile = user;

  const profileId = mongoose.Types.ObjectId(req.profile._id);

  if (req.user && profileId.equals(req.user._id)) {
    req.isAuthUser = true;
    return next();
  }
  next();
};
