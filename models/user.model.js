const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  fullName: {
    type: String,
    required: [true, "Fullname should not be empty"],
  },
  email: {
    type: String,
    required: [true, "Email should not be empty"],
  },
  userName: {
    type: String,
    unique: true,
    minLength: 6,
    required: [true, "User name should not be empty"],
  },
  password: {
    type: String,
    minLength: 6,
    required: [true, "User name should not be empty"],
  },
  createdAt: {
    type: Date,
  },
});

const UserModel = Schema.model("User", UserSchema);

module.exports = UserModel;
