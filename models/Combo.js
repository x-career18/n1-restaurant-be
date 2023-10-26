const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");
const { Seq } = require("./Seq");

const ComboSchema = new Schema(
    {
        _id: {
            type: Number,
            alias: "id",
        },
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        catogory: {
            type: String,
            required: true,
        },
        countMenu: {
            type: Number,
        },
        description: {
            type: String,
        },
        images: {
            type: String
        },
    },
    { timestamps: true }
);

ComboSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: "all",
});

ComboSchema.pre('save', async function () {
    // Don't increment if this is NOT a newly created document
    if (!this.isNew) return;

    const count = await Seq.increment('Combo');
    this._id = count;
});

const Combo = mongoose.model("Combo", ComboSchema);

module.exports = {
    Combo,
    ComboSchema,
};
