const userRouter = require("./user");
const reservationRouter = require("./reservation");
const authMdw = require("../middlewares/authMdw");

function route(app) {
  // app.use(authMdw);

  app.use("/api/v1/user", authMdw, userRouter);
  app.use("/api/v1/reservation", reservationRouter);
}

module.exports = route;
