const resClientData = require("../utils/resClientData");
const { Table } = require("../models/Table");

class TableController {
  async index(req, res) {
    const dateRes = await Table.find();
    resClientData(res, 200, dateRes, "TableController - INDEX");
  }

  async create(req, res) {
    const {
      name,
      restaurantId,
      images,
      status
    } = req.body;

    if (!name) throw new Error("name Missing.!");
    if (!restaurantId) throw new Error("restaurantId Missing.!");
    if (!images) throw new Error("image Missing.!");
    if (!status) throw new Error("status Missing.!");

    const model = new Table({
      _id: 0,
      name,
      restaurantId,
      images,
      status,
    });

    const dateRes = await model.save();

    resClientData(res, 200, dateRes, "TableController - CREATE");
  }

  async getById(req, res) {
    const id = req.query["tableId"];

    const dateRes = await Table.findOne({ ["_id"]: id });

    resClientData(res, 200, dateRes, "TableController - GETBYID");
  }

  async getByArrayId(req, res) {
    const id = req.query["tableId"];

    const dateRes = await Table.find({ ["_id"]: { $in: id } });

    resClientData(res, 200, dateRes, "TableController - GETBYARRAYID");
  }

  async getByRestaurantId(req, res) {
    const id = req.query["restaurantId"];
    const status = req.query["status"];

    let query = { ["restaurantId"]: id };
    if (status) {
      query["status"] = status;
    }

    const dateRes = await Table.find({ ["restaurantId"]: id, ["status"]: status });

    resClientData(res, 200, dateRes, "TableController - GETBYRESTAURANTID");
  }

  async openTable(req, res) {
    const { tableId } = req.body;

    const dateRes = await Table.updateMany({ ["_id"]: { $in: tableId } }, { status: 2 }, { multi: true });

    resClientData(res, 200, dateRes, "TableController - openTable");
  }

  async closeTable(req, res) {
    const { tableId } = req.body;

    const dateRes = await Table.updateMany({ ["_id"]: { $in: tableId } }, { status: 1 }, { multi: true });

    resClientData(res, 200, dateRes, "TableController - closeTable");
  }
}

module.exports = new TableController();
