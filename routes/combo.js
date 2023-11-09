const express = require("express");
const router = express.Router();

const comboController = require("../controllers/ComboController");
const authMdw = require("../middlewares/authMdw");
const checkOwner = require("../middlewares/checkOwner");
const asyncHandler = require("express-async-handler")

router.use(authMdw);
router.get("/getById", checkOwner, asyncHandler(comboController.getById));
router.post("/create", checkOwner, asyncHandler(comboController.create));
router.use("/", checkOwner, asyncHandler(comboController.index));

module.exports = router;
