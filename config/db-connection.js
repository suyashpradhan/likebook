const mongoose = require("mongoose");
require("dotenv").config();

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  } catch (err) {
    return err;
  }
};

module.exports = connectToDB;
