import dbConnection from "../../server/config/dbConnection";

dbConnection();

export default async (req, res) => {
  res.status(200).json({ message: "Likebook API" });
};
