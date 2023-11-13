const express = require("express");
const router = express.Router();

const comboController = require("../controllers/ComboController");
const authMdw = require("../middlewares/authMdw");
const checkOwner = require("../middlewares/checkOwner");
const asyncHandler = require("express-async-handler")

router.get("/getById", authMdw, checkOwner, asyncHandler(comboController.getById));
router.post("/create", authMdw, checkOwner, asyncHandler(comboController.create));
router.use("/", asyncHandler(comboController.index));

module.exports = router;
