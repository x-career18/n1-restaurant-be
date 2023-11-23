const authMdw = require("../middlewares/authMdw");
const userRouter = require("./user");
const authRouter = require("./auth");
const orderRouter = require("./order");
const paymentRouter = require("./payment");
const reservationRouter = require("./reservation");
const restaurantRouter = require("./restaurant");
const comboRouter = require("./combo");
const tableRouter = require("./table");
const otpRouter = require("./otp");
const menuRouter = require("./menu");
const imageRouter = require("./image");


function route(app) {
  // app.use(authMdw);
  app.use("/api/v1/image", imageRouter);
  app.use("/api/v1/menuItem", menuRouter);
  app.use("/api/v1/otp", otpRouter);
  app.use("/api/v1/payment", paymentRouter);
  app.use("/api/v1/order", orderRouter);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/reservation", reservationRouter);
  app.use("/api/v1/restaurant", restaurantRouter);
  app.use("/api/v1/combo", comboRouter);
  app.use("/api/v1/table", tableRouter);
}

module.exports = route;
