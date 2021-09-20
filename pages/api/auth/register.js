import dbConnection from "../../../server/config/dbConnection";
import User from "../../../server/models/user.model";

dbConnection();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      const { fullName, userName, password } = req.body;
      try {
        if (!fullName || !userName || !password) {
          return res.status(400).json({
            status: "failed",
            message: "Signup fields should not be empty",
            statusCode: 400,
          });
        }
        const userNameExists = await User.findOne({
          userName,
        });
        if (userNameExists) {
          res.status(409).json({
            status: "failed",
            message:
              "Username already exists, please try choosing a different one",
            code: 409,
          });
          return userNameExists;
        } else {
          let newUser = new User({ fullName, userName, password });
          newUser = await newUser.save();
          res.status(201).json({
            status: "success",
            message:
              "You are successfully signed up with us, please login with your credentials",
            code: 201,
          });
        }
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
