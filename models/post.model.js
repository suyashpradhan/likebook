const mongoose = require("mongoose");

const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      maxlength: [280, "Post content should not extend 280 characters"],
      minLength: [1, "Post content should have minimum 1 or more character"],
      required: [true, "Post content should not be empty"],
    },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    isActive: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const PostModel = Schema.model("Post", PostSchema);

module.exports = PostModel;
