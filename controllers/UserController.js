const resClientData = require("../utils/resClientData");

class UserController {
  async index(req, res) {
    resClientData(res, 200, "OK");
  }
}

module.exports = new UserController();
