const resClientData = require("../utils/resClientData");
const { MenuItem } = require("../models/MenuItem");

class MenuController {
    async index(req, res) {
        const dateRes = await MenuItem.find();
        resClientData(res, 200, dateRes, "MenuController - INDEX");
    }

    async create(req, res) {
        const {
            name,
            image,
            category,
            description,
            unit,
            costPerUnit,
            discount,
            status
        } = req.body;

        const isExist = await MenuItem.findOne({ name });
        if (isExist) throw new Error("Món đã tồn tại");

        const model = new MenuItem({
            _id: 0,
            name,
            image: image ? image : "/defaultImage.jpg",
            category,
            description,
            unit,
            costPerUnit,
            discount,
            status
        });

        const resData = await model.save();
        resClientData(res, 200, resData, "MenuController - create");
    }

    async update(req, res) {
        const {
            id,
            name,
            image,
            category,
            description,
            unit,
            costPerUnit,
            discount,
            status
        } = req.body;

        const isExist = await MenuItem.findOneAndUpdate(
            { ["_id"]: id },
            {
                name,
                image,
                category,
                description,
                unit,
                costPerUnit,
                discount,
                status
            },
            { returnDocument: 'after' }
        );

        resClientData(res, 200, isExist, "MenuController - update");
    }

    async getById(req, res) {
        const id = req.query["menuItemId"];

        const dateRes = await MenuItem.findOne({ ["_id"]: id });

        resClientData(res, 200, dateRes, "MenuController - getById");
    }
}

module.exports = new MenuController();
