import dbConnection from "../../../server/config/dbConnection";
import Post from "../../../server/models/user.model";

dbConnection();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
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
        res.status(400).json({
          status: "failed",
          code: 400,
          message: "Something Went Wrong!",
        });
      }
      break;

    default:
      break;
  }
};
