const mongoose = require("mongoose");

const { Schema } = mongoose;

const PostSchema = new Schema({
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
    maxlength: [280, "Post content should not extend 280 characters"],
    required: [true, "Post content should not be empty"],
  },
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model.Post || mongoose.model("Post", PostSchema);
