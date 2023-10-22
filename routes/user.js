const express = require("express");
const router = express.Router();

const userController = require("../controllers/UserController");
const asyncHandler = require("express-async-handler")

router.use("/", asyncHandler(userController.index));

module.exports = router;
