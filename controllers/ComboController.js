const resClientData = require("../utils/resClientData");
const { Combo } = require("../models/Combo");

class ComboController {
  async index(req, res) {
    const dateRes = await Combo.find();
    resClientData(res, 200, dateRes, "ComboController - INDEX");
  }

  async create(req, res) {
    const {
      name,
      price,
      catogory,
      countMenu,
      description,
      images
    } = req.body;

    if (!name) throw new Error("name Missing.!");
    if (!price) throw new Error("name Missing.!");
    if (!catogory) throw new Error("address Missing.!");
    if (!countMenu) throw new Error("openingTime Missing.!");
    if (!description) throw new Error("description Missing.!");
    if (!images) throw new Error("images Missing.!");

    const model = new Combo({
      _id: 0,
      name,
      price,
      catogory,
      countMenu,
      description,
      images
    });

    const dateRes = await model.save();

    resClientData(res, 200, dateRes, "ComboController - CREATE");
  }

  async getById(req, res) {
    const id = req.query["comboId"];

    const dateRes = await Combo.findOne({ ["_id"]: id });

    resClientData(res, 200, dateRes, "ComboController - GETBYID");
  }
}

module.exports = new ComboController();
