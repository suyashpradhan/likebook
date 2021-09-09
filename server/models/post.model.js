const mongoose = require("mongoose");

const { Schema } = mongoose;

const PostSchema = new Schema(
  {
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
    isActive: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const autoPopulatePostedBy = function (next) {
  this.populate("postedBy", "_id fullName userName");
  next();
};

PostSchema.pre("findOne", autoPopulatePostedBy).pre(
  "find",
  autoPopulatePostedBy
);
PostSchema.index({ postedBy: 1, createdAt: 1 });

module.exports = mongoose.model.Post || mongoose.model("Post", PostSchema);
