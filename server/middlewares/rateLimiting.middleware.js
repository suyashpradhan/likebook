const rateLimit = require("express-rate-limit");

const limitRequests = rateLimit({
  max: 15,
  window: 180000,
  message: "Too many requests, please try again after 5 minutes",
});

module.exports = limitRequests;
