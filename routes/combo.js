const express = require("express");
const router = express.Router();

const comboController = require("../controllers/ComboController");
const asyncHandler = require("express-async-handler")

router.get("/getById", asyncHandler(comboController.getById));
router.post("/create", asyncHandler(comboController.create));
router.use("/", asyncHandler(comboController.index));

module.exports = router;
