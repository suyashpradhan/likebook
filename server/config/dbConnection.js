const mongoose = require("mongoose");

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

function dbConnection() {
  if (mongoose.connection.readyState === 1) {
    console.log("already connected");
    return;
  }

  mongoose
    .connect(process.env.DB_CONNECTION_STRING, mongooseOptions)
    .then(() => console.log("DB connected"))
    .catch((e) => console.log(e));

  mongoose.connection.on("error", (err) => {
    console.log(`DB connection error: ${err.message}`);
  });
}

module.exports = dbConnection;
