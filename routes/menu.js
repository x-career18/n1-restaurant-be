const express = require("express");
const router = express.Router();

const controller = require("../controllers/MenuController");
const asyncHandler = require("express-async-handler");
const authMdw = require("../middlewares/authMdw");

// router.use(authMdw);
router.use("/create", authMdw, asyncHandler(controller.create));
router.use("/update", authMdw, asyncHandler(controller.update));
router.use("/getById", asyncHandler(controller.getById));
router.use("/", asyncHandler(controller.index));

module.exports = router;
