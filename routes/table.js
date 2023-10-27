const express = require("express");
const router = express.Router();

const controller = require("../controllers/TableController");
const asyncHandler = require("express-async-handler");

router.get("/getByRestaurantId", asyncHandler(controller.getByRestaurantId));
router.get("/getById", asyncHandler(controller.getById));
router.post("/create", asyncHandler(controller.create));
router.use("/", asyncHandler(controller.index));

module.exports = router;
