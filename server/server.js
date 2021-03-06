const express = require("express");
const next = require("next");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const dbConnection = require("./config/dbConnection");

require("dotenv").config();

require("./models/post.model");
require("./models/user.model");

dbConnection();
const routes = require("./routes");

const dev = process.env.NODE_ENV !== "production";
const ROOT_URL = dev
  ? process.env.NEXT_PUBLIC_PRODUCTION_URL
  : `http://localhost:${process.env.PORT}`;

const app = next({ dev });
const handle = app.getRequestHandler();

// Rate Limiting API
const limitRequests = rateLimit({
  max: 15,
  windowMs: 5 * 60 * 1000,
  statusCode: 429,
  message: "Too many requests, please try again after 5 minutes",
});

app.prepare().then(() => {
  const server = express();

  server.use(express.json());
  server.use(helmet());

  server.get("/_next/*", (req, res) => {
    handle(req, res);
  });

  server.use("/api/posts/like", limitRequests);
  server.use("/api/posts/unlike", limitRequests);

  server.use("/", routes);

  server.get("*", (req, res) => {
    handle(req, res);
  });

  server.listen(process.env.PORT, (err) => {
    if (err) throw err;
    console.log(`Server listening on ${ROOT_URL}`);
  });
});
