const express = require("express");
const router = express.Router();

const controller = require("../controllers/TableController");
const asyncHandler = require("express-async-handler");


router.post("/openTable", asyncHandler(controller.openTable));
router.post("/closeTable", asyncHandler(controller.closeTable));
router.get("/getByRestaurantId", asyncHandler(controller.getByRestaurantId));
router.get("/getByArrayId", asyncHandler(controller.getByArrayId));
router.get("/getById", asyncHandler(controller.getById));
router.post("/create", asyncHandler(controller.create));
router.post("/update", asyncHandler(controller.update));
router.use("/", asyncHandler(controller.index));

module.exports = router;
