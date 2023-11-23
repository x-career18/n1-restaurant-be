const express = require("express");
const router = express.Router();

const controller = require("../controllers/OTPController");
const asyncHandler = require("express-async-handler");

router.use("/create", asyncHandler(controller.create));
router.use("/verify", asyncHandler(controller.verify));

module.exports = router;
