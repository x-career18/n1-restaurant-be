const { Reservation } = require("../models/Reservation");
const { Table } = require("../models/Table");
const resClientData = require("../utils/resClientData");

class ReservationController {
  async index(req, res) {
    const dateRes = await Reservation.find();
    resClientData(res, 200, dateRes, "ReservationController - INDEX");
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
      status,
    } = req.body;

    if (!fullname) throw new Error("FullName Missing.!");
    if (!phoneNo) throw new Error("phoneNo Missing.!");
    if (!restaurantId) throw new Error("restaurantId Missing.!");
    if (!tableId) throw new Error("tableId Missing.!");
    if (!tableCount) throw new Error("tableCount Missing.!");
    if (!checkinTime) throw new Error("checkinTime Missing.!");
    if (!expiredTime) throw new Error("expiredTime Missing.!");

    let orderItem = [];
    if (order?.length > 0) {
      orderItem = order;
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
      status: 0
    });

    const dateRes = await model.save();
    await Table.updateMany({ ["_id"]: { $in: tableId } }, { status: 0 }, { multi: true });

    resClientData(res, 200, dateRes, "ReservationController - CREATE");
  }

  async getById(req, res) {
    const id = req.query["reservationId"];

    // console.log("ReservationController - CREATE", req.body);
    const dateRes = await Reservation.findOne({ ["_id"]: id });

    resClientData(res, 200, dateRes, "ReservationController - GETBYID");
  }

  async getByTableId(req, res) {
    const split = req.query["tableId"];
    const id = split.split(",").map(Number);

    const dateRes = await Reservation.findOne({ ["tableId"]: { $in: id }, ["status"]: 0 });

    resClientData(res, 200, dateRes, "ReservationController - GETBYTABLEID");
  }

  async getAllByRestaurantId(req, res) {
    const id = req.query["restaurantId"];
    const status = req.query["status"];

    let query = { ["restaurantId"]: id, ["status"]: 0 };
    if (status) {
      query["status"] = status;
    }

    const dateRes = await Reservation.find(query);

    resClientData(res, 200, dateRes, "ReservationController - GETALLBYRESTAURANTID");
  }

  async checkInReservation(req, res) {
    const id = req.query["reservationId"];

    const dateRes = await Reservation.findOneAndUpdate({ ["_id"]: id }, { ["status"]: 3 }, { returnDocument: 'after' });

    resClientData(res, 200, dateRes, "ReservationController - checkInReservation");
  }
}

module.exports = new ReservationController();
