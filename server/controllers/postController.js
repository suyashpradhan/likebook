const mongoose = require("mongoose");
const Post = mongoose.model("Post");

exports.addNewPost = async (req, res) => {
  try {
    req.body.postedBy = req.user._id;
    const post = await new Post(req.body).save();
    await Post.populate(post, {
      path: "postedBy",
      select: "_id fullName userName",
    });
    res.status(200).json({
      status: "success",
      message: "Post Added Successfully",
      code: 200,
      post,
    });
  } catch (error) {
    res.status(400).json({
      status: "success",
      message: "Error while posting ",
      code: 400,
    });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const page = Number(req.query.page * 1 || 1);
    const limit = Number(req.query.limit * 1 || 10);
    const skipValue = Number((page - 1) * limit);

    /* if (req.query.page) {
      const postCount = await Post.countDocuments();
      console.log(postCount);
      if (skip > postCount) {
        return new Error("You have reached the end of the page");
      }
    } */
    const posts = await Post.find().skip(skipValue).limit(limit);
    res
      .status(200)
      .json({ status: "success", message: "Fetched all posts", posts });
  } catch (error) {
    res.status(400).json({ status: "failed", message: "Something went wrong" });
  }
};

exports.toggleLike = async (req, res) => {
  try {
    const { postId } = req.body;
    const post = await Post.findOne({ _id: postId });
    const idOfLikedPost = post.likes.map((id) => id.toString());
    const user = req.user._id.toString();

    if (idOfLikedPost.includes(user)) {
      await post.likes.pull(user);
    } else {
      await post.likes.push(user);
    }
    await post.save();
    res.status(200).json({
      status: "success",
      code: 200,
      post,
    });
  } catch (error) {
    res
      .status(400)
      .json({ status: "failed", code: 400, message: "Something Went Wrong!" });
  }
};
