const jwt = require("jsonwebtoken");

const signToken = (_id) => {
  return jwt.sign({ _id }, "my-secret-token-is-very-hard-to-guess", {
    expiresIn: "24h",
  });
};

module.exports = signToken;
