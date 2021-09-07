/* const express = require("express");

const morgan = require("morgan");

const app = express();
app.use(morgan("tiny")); */

export default function handler(req, res) {
  res.status(200).json({ name: "Suyash" });
}
