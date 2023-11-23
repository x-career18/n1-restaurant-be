const asyncHandler = require("express-async-handler");

const registerValidateMdw =
    asyncHandler(async (req, res, next) => {
        const {
            username,
            fullName,
            password,
            phoneNo,
            address,
        } = req.body;

        if (!username) throw new Error("username Missing.!");
        if (!fullName) throw new Error("fullName Missing.!");
        if (!password) throw new Error("userpassword Missing.!");
        if (!phoneNo) throw new Error("phoneNo Missing.!");
        if (!address) throw new Error("address Missing.!");

        next();
    });

module.exports = registerValidateMdw;
