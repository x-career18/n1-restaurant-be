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
      images
    } = req.body;

    if (!name) throw new Error("name Missing.!");
    if (!address) throw new Error("address Missing.!");
    if (!openingTime) throw new Error("openingTime Missing.!");
    if (!closingTime) throw new Error("closingTime Missing.!");
    if (!description) throw new Error("description Missing.!");
    if (!images || images.length == 0) throw new Error("images Missing.!");

    const model = new Restaurant({
      _id: 0,
      name,
      address,
      openingTime,
      closingTime,
      description,
      images
    });

    const dateRes = await model.save();

    resClientData(res, 200, dateRes, "RestaurantController - CREATE");
  }

  async getById(req, res) {
    const id = req.query["restaurantId"];

    const dateRes = await Restaurant.findOne({ ["_id"]: id });

    resClientData(res, 200, dateRes, "RestaurantController - GETBYID");
  }
}

module.exports = new RestaurantController();
