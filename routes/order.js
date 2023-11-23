const express = require("express");
const router = express.Router();

const controller = require("../controllers/OrderController");
const asyncHandler = require("express-async-handler");
const authMdw = require("../middlewares/authMdw");
const orderValidateMdw = require("../middlewares/validate/orderMdw");

router.use(authMdw);
router.use("/create", orderValidateMdw, asyncHandler(controller.create));
router.use("/update", asyncHandler(controller.update));
router.use("/getById", asyncHandler(controller.getById));
router.use("/", asyncHandler(controller.index));

module.exports = router;
