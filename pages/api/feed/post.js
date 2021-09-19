import dbConnection from "../../../server/config/dbConnection";
import Post from "../../../server/models/post.model";
import authMiddleware from "../../../server/middlewares/authentication.middleware";

dbConnection();

const handler = async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        console.log(req.body);
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
      break;

    case "GET":
      try {
        const page = Number(req.query.page * 1 || 1);
        const limit = Number(req.query.limit * 1 || 10);
        const skipValue = Number((page - 1) * limit);
        const postCount = await Post.countDocuments();
        if (skipValue > postCount) {
          return res.status(200).json({
            status: "success",
            message: "You have reached the end of the page",
            posts: [],
          });
        } else {
          const posts = await Post.find().skip(skipValue).limit(limit);
          return res.status(200).json({
            status: "success",
            message: "Fetched all posts",
            posts,
          });
        }
      } catch (error) {
        res
          .status(400)
          .json({ status: "failed", message: "Something went wrong" });
      }

    default:
      break;
  }
};

export default authMiddleware(handler);
