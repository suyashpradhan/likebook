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
    const posts = await Post.find({});
    console.log(posts);
    res
      .status(200)
      .json({ status: "success", message: "Fetched all posts", posts });
  } catch (error) {
    res.status(400).json({ status: "failed", message: "Something went wrong" });
  }
};

exports.toggleLike = async (req, res) => {
  const { postId } = req.body;

  const post = await Post.findOne({ _id: postId });
  const likeIds = post.likes.map((id) => id.toString());
  const authUserId = req.user._id.toString();
  if (likeIds.includes(authUserId)) {
    await post.likes.pull(authUserId);
  } else {
    await post.likes.push(authUserId);
  }
  await post.save();
  res.json(post);
};
