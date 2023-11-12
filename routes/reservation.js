const express = require("express");
const router = express.Router();

const reservationController = require("../controllers/ReservationController");
const asyncHandler = require("express-async-handler")

router.get("/checkInReservation", asyncHandler(reservationController.checkInReservation));
router.get("/getAllByRestaurantId", asyncHandler(reservationController.getAllByRestaurantId));
router.get("/getByTableId", asyncHandler(reservationController.getByTableId));
router.get("/getById", asyncHandler(reservationController.getById));
router.post("/create", asyncHandler(reservationController.create));
router.post("/update", asyncHandler(reservationController.update));
router.use("/", asyncHandler(reservationController.index));

module.exports = router;
