import jwt from "jsonwebtoken";
import dbConnection from "../../../config/db-connection";
import User from "../../../models/user.model";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const newUser = await User.create(req.body);

    const token = jwt.sign({ id: newUser._id }, "my-secret-token", {
      expiresIn: "24hr",
    });

    res.status(200).json({ status: "success", token, data: { newUser } });
  }
};

export default dbConnection(handler);
