const { User } = require("../models/User");
const resClientData = require("../utils/resClientData");

class UserController {
  async index(req, res) {
    resClientData(res, 200, "UserController - INDEX");
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

    model.save();

    resClientData(res, 200, "UserController - create");
  }

  async update(req, res) {
    const {
      id,
      fullName,
      gender,
      username,
      password,
      avata,
      status,
      role
    } = req.body;
    const user = req.user;

    const isExist = User.findOne({ ["_id"]: id });
    if (isExist) throw new Error("Tài khoản chưa tồn tại");

    const model = new User({
      fullName,
      gender,
      username,
      password,
      avata,
      status,
      role: user.role == 1 ? role : 2
    });

    model.save();

    resClientData(res, 200, "UserController - update");
  }

}

module.exports = new UserController();
