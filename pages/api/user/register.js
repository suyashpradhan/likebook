import dbConnection from "../../../config/db-connection";
import User from "../../../models/user.model";
import Post from "../../../models/post.model";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      let userData = req.body;
      const userNameExists = await User.findOne({
        userName: userData.userName,
      });
      if (userNameExists) {
        res.status(409).json({
          status: "failed",
          message: "Conflicting Username",
          description:
            "Username already exists, please try choosing a different one",
        });
        return userNameExists;
      } else {
        let newUser = new User(userData);
        newUser = await newUser.save();
        res.status(201).json({
          status: "success",
          message: "Successfully signed up",
          description:
            "You are successfully signed up with us, please login with your credentials",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: "failed",
        message: "Something went wrong",
      });
    }
  }
};

export default dbConnection(handler);
