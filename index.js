require("dotenv").config();

const express = require("express");
const app = express();
const { API_PORT } = process.env;
const cors = require("cors");
const logger = require("morgan");
const route = require("./routes");
const errorHandlerMdw = require("./middlewares/errorHandlerMdw");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

route(app);

app.use(errorHandlerMdw);

app.listen(API_PORT, () =>
  console.log(`App listening at http://localhost:${API_PORT}`)
);
