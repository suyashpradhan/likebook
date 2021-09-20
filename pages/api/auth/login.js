import dbConnection from "../../../server/config/dbConnection";
import User from "../../../server/models/user.model";
import signToken from "../../../server/utils/signToken";

dbConnection();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const { userName, password } = req.body;

        if (!userName || !password) {
          res.status(400).json({
            status: "failed",
            message:
              "Empty Credentials, Please provide Username and password to login",
          });
          return true;
        }

        const user = await User.findOne({ userName }).select(
          "+password -createdAt -updatedAt -__v"
        );

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
          user: {
            userName: user.userName,
            fullName: user.fullName,
            _id: user._id,
          },
        });
      } catch (err) {
        res.status(500).json({
          status: "failed",
          message: "Something went wrong",
        });
      }
      break;

    default:
      break;
  }
};
