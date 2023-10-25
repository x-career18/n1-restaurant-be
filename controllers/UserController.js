const resClientData = require("../utils/resClientData");

class UserController {
  async index(req, res) {
    resClientData(res, 200, "UserController - INDEX");
  }
}

module.exports = new UserController();
