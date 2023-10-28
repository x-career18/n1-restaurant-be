const express = require("express");
const router = express.Router();

const reservationController = require("../controllers/ReservationController");
const asyncHandler = require("express-async-handler")

router.get("/getByTableId", asyncHandler(reservationController.getByTableId));
router.get("/getById", asyncHandler(reservationController.getById));
router.post("/create", asyncHandler(reservationController.create));
router.use("/", asyncHandler(reservationController.index));

module.exports = router;
