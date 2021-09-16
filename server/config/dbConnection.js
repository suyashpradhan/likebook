const mongoose = require("mongoose");

const mongooseOptions = {
  useNewUrlParser: true,
};

function dbConnection() {
  mongoose
    .connect(process.env.DB_CONNECTION_STRING, mongooseOptions)
    .then(() => console.log("DB connected"))
    .catch((e) => console.log(e));

  mongoose.connection.on("error", (err) => {
    console.log(`DB connection error: ${err.message}`);
  });
}

module.exports = dbConnection;
