const { User } = require("../models/User");
const resClientData = require("../utils/resClientData");

class UserController {
  async index(req, res) {
    const resData = await User.find();
    resClientData(res, 200, resData, "UserController - INDEX");
  }

  async create(req, res) {
    const {
      fullName,
      gender,
      username,
      password,
      avata,
      status,
      role,
      restaurantId
    } = req.body;

    if (!fullName) throw new Error("fullName Missing.!");
    if (!gender) throw new Error("gender Missing.!");
    if (!username) throw new Error("username Missing.!");
    if (!password) throw new Error("password Missing.!");
    if (!avata) throw new Error("avata Missing.!");
    if (!status) throw new Error("status Missing.!");
    if (!role) throw new Error("role Missing.!");
    if (!restaurantId) throw new Error("restaurantId Missing.!");

    const user = req.user;

    const isExist = User.findOne({ username });
    if (isExist) throw new Error("Tài khoản đã tồn tại");

    const model = new User({
      fullName,
      gender,
      username,
      password,
      avata,
      status,
      restaurantId,
      role: user?.role == 1 ? role : 2
    });

    const resData = await model.save();

    resClientData(res, 200, resData, "UserController - create");
  }

  async update(req, res) {
    const {
      id,
      fullName,
      gender,
      password,
      avata,
      status,
      role
    } = req.body;
    const user = req.user;

    if (!id) throw new Error("id Missing.!");
    const isExist = User.findOne({ ["_id"]: id });
    if (isExist) throw new Error("Tài khoản chưa tồn tại");

    if (fullName) isExist.fullName = fullName;
    if (gender) isExist.gender = gender;
    if (password) isExist.password = password;
    if (avata) isExist.avata = avata;
    if (status) isExist.status = status;
    if (role) isExist.role = role;
    if (restaurantId) isExist.restaurantId = restaurantId;

    const resData = await isExist.save();

    resClientData(res, 200, resData, "UserController - update");
  }

}

module.exports = new UserController();
