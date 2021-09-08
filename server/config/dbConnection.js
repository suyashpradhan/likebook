const mongoose = require("mongoose");

const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

const dbConnection = async (req, res) => {
  if (mongoose.connections[0].readyState) {
    return handler(req, res);
  }
  await mongoose.connect(process.env.DB_URL, mongooseOptions);
  return handler(req, res);
};

export default dbConnection;
