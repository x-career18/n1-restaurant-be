const resClientData = require("../utils/resClientData");
const { Reservation } = require("../models/Reservation");
const { Order } = require("../models/Order");
const { Payment } = require("../models/Payment");
const { Table } = require("../models/Table");

class PaymentController {
    async index(req, res) {
        const dateRes = await Payment.find();
        resClientData(res, 200, dateRes, "PaymentController - INDEX");
    }

    async create(req, res) {
        const {
            orderId,
            userId,
            payment
        } = req.body;

        const isOrderExist = await Order.findOne({ ["_id"]: orderId });
        if (!isOrderExist) throw new Error("Không có thông tin đặt món");

        const isReservation = await Reservation.findOne({ ["_id"]: isOrderExist.reservationId });
        if (!isReservation) throw new Error("Không có thông tin bàn");


        const model = new Payment({
            restaurantId: isReservation.restaurantId,
            orderId,
            userId,
            payment
        });

        const resData = await model.save();

        isOrderExist.status = 2;
        isReservation.status = 2;
        await Table.updateMany({ ["_id"]: { $in: isReservation.tableId } }, { status: 1 }, { multi: true });

        await isOrderExist.save();
        await isReservation.save();

        resClientData(res, 200, resData, "PaymentController - create");
    }

    async update(req, res) {
        const {
            id,
            payment,
        } = req.body;

        const isExist = await Payment.findOneAndUpdate(
            { ["_id"]: id },
            {
                payment
            },
            { returnDocument: 'after' }
        );

        resClientData(res, 200, isExist, "PaymentController - update");
    }

    async getById(req, res) {
        const id = req.query["paymentId"];

        const dateRes = await Payment.findOne({ ["_id"]: id });

        resClientData(res, 200, dateRes, "PaymentController - getById");
    }
}

module.exports = new PaymentController();
