const { uploadStream } = require("../middlewares/multer");
const { Image } = require("../models/Image");
const resClientData = require("../utils/resClientData");

class ImageController {
    async index(req, res) {
        const dateRes = await Image.find();
        resClientData(res, 200, dateRes, "ImageController - INDEX");
    }

    async create(req, res) {
        const body = JSON.parse(JSON.stringify(req.body));
        const { restaurantId, name, folder } = body;

        if (!restaurantId || !name)
            throw new Error("Missing required fields");

        const src = await uploadStream(req.file.buffer, folder);
        if (!src)
            throw new Error("src Missing");


        const model = Image({
            restaurantId,
            name,
            src: src.public_id,
        });

        const dateRes = await model.save();

        resClientData(res, 200, dateRes, "ImageController - CREATE");
    }

    async update(req, res) {
        const { imageId, name, active } = req.body;

        if (!imageId) throw new Error("Missing required fields");

        const isExist = await ImageModel.findOne({ ["_id"]: imageId });
        if (!isExist) throw new Error("Image not already exist");

        if (name === isExist.name)
            throw new Error("Image has already exist");

        const dateRes = await model.save();
        resClientData(res, 200, dateRes, "ImageController - update");
    }

    async getById(req, res) {
        const id = req.query["imageId"];

        const dateRes = await Combo.findOne({ ["_id"]: id });

        resClientData(res, 200, dateRes, "ImageController - GETBYID");
    }
}

module.exports = new ImageController();