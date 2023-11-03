const asyncHandler = require("express-async-handler");

const orderValidateMdw =
    asyncHandler(async (req, res, next) => {
        const {
            reservationId,
            order,
            userId
        } = req.body;

        if (!reservationId) throw new Error("reservationId Missing.!");
        if (!userId) throw new Error("userId Missing.!");
        if (!order || order.length == 0) throw new Error("order Missing.!");

        next();
    });

module.exports = orderValidateMdw;
