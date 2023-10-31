const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const asyncHandler = require("express-async-handler");

const authMdw =
  asyncHandler(async (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
      res.status(403);
      throw new Error("A token is needed to access");
    }

    jwt.verify(token, SECRET_KEY, {}, (err, decoded) => {
      if (err) {
        res.status(403);
        throw new Error("Invalid token");
      }
      req.user = decoded;
      next();
    });
  });

module.exports = authMdw;
