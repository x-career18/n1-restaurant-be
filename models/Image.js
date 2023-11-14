const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");
const { Seq } = require("./Seq");

const ImageSchema = new Schema(
    {
        _id: {
            type: Number,
            alias: "id",
        },
        restaurantId: {
            type: Number,
            cast: "{VALUE} is invalid",
            required: [true, "RestauranId is required"],
        },
        name: {
            type: String,
            cast: "{VALUE} is invalid",
            required: [true, "Name is required"],
        },
        src: {
            type: String,
            cast: "{VALUE} is invalid",
            required: [true, "src is required"],
        },
    },
    { timestamps: true }
);

ImageSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: "all",
});

ImageSchema.pre('save', async function () {
    // Don't increment if this is NOT a newly created document
    if (!this.isNew) return;

    const count = await Seq.increment('Image');
    this._id = count;
});

const Image = mongoose.model("Image", ImageSchema);

module.exports = {
    Image,
    ImageSchema,
};
