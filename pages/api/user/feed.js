import dbConnection from "../../../config/db-connection";
import Post from "../../../models/post.model";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  if (req.method === "POST") {
    /* const { authorization } = req.headers;
    console.log("AA", authorization);
    if (!authorization) {
      return res.status(401).json({ sucess: false, message: "Failed" });
    }
    try {
      const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);
    } catch (e) {
      return res.status(401).json({ sucess: false, message: "Must verify" });
    } */
  }
};

export default dbConnection(handler);
