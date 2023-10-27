const authMdw = require("../middlewares/authMdw");
const userRouter = require("./user");
const reservationRouter = require("./reservation");
const restaurantRouter = require("./restaurant");
const comboRouter = require("./combo");
const tableRouter = require("./table");
function route(app) {
  // app.use(authMdw);

  app.use("/api/v1/user", authMdw, userRouter);
  app.use("/api/v1/reservation", reservationRouter);
  app.use("/api/v1/restaurant", restaurantRouter);
  app.use("/api/v1/combo", comboRouter);
  app.use("/api/v1/table", tableRouter);
}

module.exports = route;
