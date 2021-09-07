import dbConnection from "../../../config/db-connection";
import User from "../../../models/user.model";
import { signToken } from "../../../utils/signToken";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { userName, password } = req.body;
      console.log(userName, password);

      if (!userName || !password) {
        res.status(400).json({
          status: "failed",
          message:
            "Empty Credentials, Please provide Username and password to login",
        });
        return true;
      }

      const user = await User.findOne({ userName }).select("+password");

      if (!user || !(await user.checkPassword(password, user.password))) {
        res.status(401).json({
          status: "failed",
          message: "Incorrect Username or Password, Please try again!",
        });
        return true;
      }
      const token = signToken(user._id);
      res.status(201).json({
        status: "success",
        message: "Login Successful!",
        token,
      });
    } catch (err) {
      res.status(500).json({
        status: "failed",
        message: "Something went wrong",
      });
    }
  }
};

export default dbConnection(handler);
