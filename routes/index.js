const userRouter = require("./user");
const authMdw = require("../middlewares/authMdw");

function route(app) {
  app.use(authMdw);

  app.use("/api/v1/user", userRouter);
}

module.exports = route;
