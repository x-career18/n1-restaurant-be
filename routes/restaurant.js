const express = require("express");
const router = express.Router();

const restaurantController = require("../controllers/RestaurantController");
const asyncHandler = require("express-async-handler")

router.get("/getById", asyncHandler(restaurantController.getById));
router.post("/create", asyncHandler(restaurantController.create));
router.use("/", asyncHandler(restaurantController.index));

module.exports = router;
