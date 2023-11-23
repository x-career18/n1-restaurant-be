/** kiem tra owner 
 * -> dung thi cho qua AuthController
 * -> sai thi stop lai
 * **/

const asyncHandler = require("express-async-handler");

const checkOwner =
    asyncHandler(async (req, res, next) => {
        const { role } = req.user;
        if (role != 1) {
            res.status(403);
            throw new Error("Bạn không có quyền hạn.!");
        }
        next();
    });

module.exports = checkOwner;
