const { OTP } = require("../models/OTP");
const resClientData = require("../utils/resClientData");

const randomInt = (max, min = 0) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

class OTPController {
    async create(req, res) {
        const phoneNo = req.query["phoneNo"];

        if (phoneNo == null) throw new Error("phone Missing.!");

        // Tạo OTP
        const pin = "" + randomInt(9) + randomInt(9) + randomInt(9) + randomInt(9);

        await OTP.findOneAndUpdate(
            { _id: phoneNo }, { otp: pin, status: true }, { new: true, upsert: true, returnOriginal: false }
        );

        resClientData(res, 200, [], "OTPController - create");
    }

    async verify(req, res) {
        const phoneNo = req.query["phoneNo"];
        const pin = req.query["otp"];

        if (phoneNo == null) throw new Error("phone Missing.!");

        const isExist = await OTP.findOne({ ["_id"]: phoneNo });
        if (!isExist || !isExist.status) throw new Error("OPT not exists.!");

        if (pin == isExist.otp) {
            isExist.status = false;
            await isExist.save();
            return resClientData(res, 200, "OK", "OTPController - verify");
        }

        throw new Error("Sai OTP");
    }
}

module.exports = new OTPController();
