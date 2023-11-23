const express = require("express");
const router = express.Router();

const restaurantController = require("../controllers/RestaurantController");
const authMdw = require("../middlewares/authMdw");
const checkOwner = require("../middlewares/checkOwner");
const asyncHandler = require("express-async-handler")


router.get("/getById", asyncHandler(restaurantController.getById));
router.post("/create", authMdw, checkOwner, asyncHandler(restaurantController.create));
router.post("/update", authMdw, checkOwner, asyncHandler(restaurantController.update));
router.use("/", asyncHandler(restaurantController.index));

module.exports = router;
