const resClientData = require("../utils/resClientData");
const { Reservation } = require("../models/Reservation");
const { Order } = require("../models/Order");

class OrderController {
    async index(req, res) {
        const dateRes = await Order.find();
        resClientData(res, 200, dateRes, "OrderController - INDEX");
      }

    async create(req, res) {
        const {
            reservationId,
            order,
            userId
        } = req.body;

        const isResvervationExist = await Reservation.findOne({ ["_id"]: reservationId });
        if (!isResvervationExist) throw new Error("Không có thông tin bàn");

        const model = new Order({
            reservationId,
            order,
            userId,
            status: 1
        });

        const resData = await model.save();

        resClientData(res, 200, resData, "OrderController - create");
    }

    async update(req, res) {
        const {
            id,
            order,
            status
        } = req.body;

        if (!status || ![1, 2].includes(status)) throw new Error("status Missing.!");

        const isExist = await Order.findOneAndUpdate(
            { ["_id"]: id },
            {
                order,
                status
            },
            { returnDocument: 'after' }
        );

        resClientData(res, 200, isExist, "OrderController - update");
    }

    async getById(req, res) {
        const id = req.query["reservationId"];

        const dateRes = await Order.findOne({ ["reservationId"]: id });

        resClientData(res, 200, dateRes, "OrderController - getById");
    }
}

module.exports = new OrderController();
