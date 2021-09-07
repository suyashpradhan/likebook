import mongoose from "mongoose";

const dbConnection = (handler) => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    return handler(req, res);
  }
  await mongoose.connect(process.env.DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  return handler(req, res);
};

export default dbConnection;
