const express = require("express");
const mongoose = require("mongoose");
const next = require("next");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
require("dotenv").config();

require("./models/post.model");
require("./models/user.model");

const routes = require("./routes");

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;
const ROOT_URL = dev ? `http://localhost:${port}` : process.env.PRODUCTION_URL;
const app = next({ dev });
const handle = app.getRequestHandler();

const limitRequests = rateLimit({
  max: 10,
  windowMs: 5 * 60 * 1000,
  statusCode: 429,
  message: "Too many requests, please try again after 5 minutes",
});

const mongooseOptions = {
  useNewUrlParser: true,
};

mongoose
  .connect(
    "mongodb://suyash:suyash123@like-system-shard-00-00.t7uof.mongodb.net:27017,like-system-shard-00-01.t7uof.mongodb.net:27017,like-system-shard-00-02.t7uof.mongodb.net:27017/like-system-database?ssl=true&replicaSet=atlas-251d2t-shard-0&authSource=admin&retryWrites=true&w=majority",
    mongooseOptions
  )
  .then(() => console.log("DB connected"))
  .catch((e) => console.log(e));

mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err.message}`);
});

app.prepare().then(() => {
  const server = express();

  server.use(express.json());
  server.use(helmet());

  /* give all Next.js's requests to Next.js server */
  server.get("/_next/*", (req, res) => {
    handle(req, res);
  });

  /* apply routes from the "routes" folder */
  server.use("/", routes);

  //Default route
  server.get("*", (req, res) => {
    handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server listening on ${ROOT_URL}`);
  });
});
