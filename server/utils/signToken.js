const jwt = require("jsonwebtoken");

const signToken = (_id) => {
  return jwt.sign({ _id }, "my-secret-token-is-very-hard-to-guess", {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

module.exports = signToken;
