const express = require("express");
const router = express.Router();

const controller = require("../controllers/AuthController");
const asyncHandler = require("express-async-handler");
const authMdw = require("../middlewares/authMdw");

router.use("/login", asyncHandler(controller.login));
router.use("/register", asyncHandler(controller.register));
router.use("/me", authMdw, asyncHandler(controller.me));

module.exports = router;
