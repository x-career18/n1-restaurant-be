const OTP = require("../utils/OTPCache");
const resClientData = require("../utils/resClientData");
const ReservationController = require("./ReservationController");

const randomInt = (max, min = 0) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

class OTPController {
    async create(req, res) {
        const phoneNo = req.query["phoneNo"];

        if (phoneNo == null) throw new Error("phone Missing.!");

        // Tạo OTP
        const pin = "" + randomInt(9) + randomInt(9) + randomInt(9) + randomInt(9);

        OTP.push({ phoneNo: phoneNo, otp: pin })

        console.log(OTP, { phoneNo: phoneNo, otp: pin })

        resClientData(res, 200, [], "OTPController - create");
    }

    async verify(req, res) {
        const phoneNo = req.query["phoneNo"];
        const pin = req.query["otp"];

        const isExist = OTP.find((e) => e.phoneNo == phoneNo);

        // console.log(OTP, { phoneNo: phoneNo, otp: pin }, isExist)

        if (pin == isExist.otp) {
            const index = OTP.indexOf(isExist);
            if (index > -1) { 
                OTP.splice(index, 1);
            }
            return resClientData(res, 200, "OK", "OTPController - verify");
        }
        throw new Error("Sai OTP");
    }
}

module.exports = new OTPController();
