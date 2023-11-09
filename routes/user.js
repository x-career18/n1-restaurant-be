const express = require("express");
const router = express.Router();

const userController = require("../controllers/UserController");
const asyncHandler = require("express-async-handler");
const validateSchemaMdw = require("../middlewares/validateSchemaMdw");
const { User } = require("../models/User");

router.use("/create", validateSchemaMdw(User), asyncHandler(userController.create));
router.use("/update", validateSchemaMdw(User), asyncHandler(userController.update));
router.use("/", asyncHandler(userController.index));

module.exports = router;
