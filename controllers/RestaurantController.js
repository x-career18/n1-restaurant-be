const resClientData = require("../utils/resClientData");
const { Restaurant } = require("../models/Restaurant");

class RestaurantController {
  async index(req, res) {
    const dateRes = await Restaurant.find();
    resClientData(res, 200, dateRes, "RestaurantController - INDEX");
  }

  async create(req, res) {
    const {
      name,
      address,
      openingTime,
      closingTime,
      description,
      images,
      status,
    } = req.body;

    if (!name) throw new Error("name Missing.!");
    if (!address) throw new Error("address Missing.!");
    if (!openingTime) throw new Error("openingTime Missing.!");
    if (!closingTime) throw new Error("closingTime Missing.!");
    if (!description) throw new Error("description Missing.!");

    const model = new Restaurant({
      _id: 0,
      name,
      address,
      openingTime,
      closingTime,
      description,
      images,
      status,
    });

    const dateRes = await model.save();

    resClientData(res, 200, dateRes, "RestaurantController - CREATE");
  }

  async update(req, res) {
    const {
      id,
      name,
      address,
      openingTime,
      closingTime,
      description,
      images,
      status,
      deleted
    } = req.body;

    if (!id) throw new Error("id Missing.!");
    const isExist = await Restaurant.findOne({ ["_id"]: id });
    if (!isExist) throw new Error("Không có thông tin nhà hàng");

    if (name) isExist.name = name;
    if (address) isExist.address = address;
    if (openingTime) isExist.openingTime = openingTime;
    if (closingTime) isExist.closingTime = closingTime;
    if (description) isExist.description = description;
    if (images) isExist.images = images;
    isExist.status = status;
    isExist.deleted = deleted;

    const dateRes = await isExist.save();

    resClientData(res, 200, dateRes, "RestaurantController - update");
  }

  async getById(req, res) {
    const id = req.query["restaurantId"];

    const dateRes = await Restaurant.findOne({ ["_id"]: id });

    resClientData(res, 200, dateRes, "RestaurantController - GETBYID");
  }
}

module.exports = new RestaurantController();
