const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Fullname should not be empty"],
    },
    userName: {
      type: String,
      unique: true,
      minLength: 6,
      required: [true, "User name should not be empty"],
    },
    password: {
      type: String,
      minLength: 8,
      required: [true, "Password should not be empty"],
    },
  },
  { timestamps: true }
);

// Pre save hook for hashing the password before the document is saved in DB
UserSchema.pre("save", async function (next) {
  //Only Run if password is modified
  if (!this.isModified("password")) return next();

  //Hashing and Salting the password with bcryptjs
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model.UserModel || mongoose.model("User", UserSchema);
