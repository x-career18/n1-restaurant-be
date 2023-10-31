const express = require("express");
const router = express.Router();

const controller = require("../controllers/AuthController");
const asyncHandler = require("express-async-handler");
const authMdw = require("../middlewares/authMdw");
const registerValidateMdw = require("../middlewares/validate/registerMdw");

router.use("/login", asyncHandler(controller.login));
router.use("/register", registerValidateMdw, asyncHandler(controller.register));
router.use("/me", authMdw, asyncHandler(controller.me));

module.exports = router;
