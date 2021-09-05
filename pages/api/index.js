const express = require("express");

const morgan = require("morgan");

const app = express();
app.use(morgan("tiny"));

export default function requestHandler(req, res) {
  res.status(200).json({ name: "Suyash" });
}
