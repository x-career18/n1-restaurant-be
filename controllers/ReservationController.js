const { Order } = require("../models/Order");
const { Reservation } = require("../models/Reservation");
const resClientData = require("../utils/resClientData");

class ReservationController {
  async index(req, res) {
    resClientData(res, 200, "ReservationController - INDEX");
  }

  async create(req, res) {
    const {
      fullname,
      phoneNo,
      restaurantId,
      tableId,
      tableCount,
      order,
      checkinTime,
      expiredTime,
      status
    } = req.body;

    // console.log("ReservationController - CREATE", req.body);
    let orderItem = {};
    if (order) {
      const orderModel = new Order({
        _id: 0,
        ...order
      });
      orderItem = await orderModel.save();
    }

    const model = new Reservation({
      _id: 0,
      fullname,
      phoneNo,
      restaurantId,
      tableId,
      tableCount,
      order: orderItem,
      checkinTime,
      expiredTime,
      status
    });

    const dateRes = await model.save();

    resClientData(res, 200, dateRes, "ReservationController - CREATE");
  }

  async getById(req, res) {
    const id = req.query["reservationId"];

    // console.log("ReservationController - CREATE", req.body);
    const dateRes = await Reservation.findOne({ ["_id"]: id });

    resClientData(res, 200, dateRes, "ReservationController - GETBYID");
  }
}

module.exports = new ReservationController();
