const jwt = require("../config/jwt");
const { User } = require("../models/User");
const resClientData = require("../utils/resClientData");

class AuthController {
  async login(req, res) {
    const {
      username,
      password
    } = req.body;

    const isExist = await User.findOne({ username });
    if (!isExist) throw new Error("Sai thông tin tài khoản");
    if (password != isExist.password) throw new Error("Mật khẩu không đúng");

    delete isExist["_doc"].password;

    const jwtPayload = {
      _id: isExist._id,
      role: isExist.role,
    };

    const token = await jwt.Sign(jwtPayload, 60 * 24);

    resClientData(res, 200, token, "AuthController - login");
  }

  async register(req, res) {
    const {
      fullName,
      gender,
      username,
      password,
      avata,
      status
    } = req.body;

    const isExist = await User.findOne({ username });
    if (isExist) throw new Error("Tài khoản đã tồn tại");

    const model = new User({
      fullName,
      gender,
      username,
      password,
      avata,
      status,
      role: 3
    });

    model.save();

    resClientData(res, 200, "AuthController - create");
  }

  async me(req, res) {
    const { _id } = req.user;
    const isExist = await User.findOne({ _id });
    delete isExist["_doc"].password;

    resClientData(res, 200, isExist, "AuthController - update");
  }
}

module.exports = new AuthController();
