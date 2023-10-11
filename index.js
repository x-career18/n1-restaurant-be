require("dotenv").config();

const express = require("express");
const app = express();
const { API_PORT } = process.env;
const cors = require("cors");
const logger = require("morgan");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.listen(API_PORT, () =>
  console.log(`App listening at http://localhost:${API_PORT}`)
);
