import dbConnection from "../../../config/db-connection";
import PostModel from "../../../models/post.model";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { user } = req;
      const postData = req.body;
      let newPost = new PostModel(postData);
      newPost.userId = user._id;
      newPost.isActive = true;
      newPost = await newPost.save();
      res.status(201).json({
        success: true,
        message: "Added New Post",
        post: newPost,
      });
    } catch (e) {
      res.status(500).json({
        success: false,
        message: "Failed to add post ",
      });
    }
  }
};

export default dbConnection(handler);
