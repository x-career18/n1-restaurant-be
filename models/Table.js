const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");
const { Seq } = require("./Seq");

const TableSchema = new Schema(
    {
        _id: {
            type: Number,
            alias: "id",
        },
        name: {
            type: String,
            required: true,
        },
        restaurantId: {
            type: Number
        },
        images: {
            type: String
        },
        status: {
            type: Number
        }
    },
    { timestamps: true }
);

TableSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: "all",
});

TableSchema.pre('save', async function () {
    // Don't increment if this is NOT a newly created document
    if (!this.isNew) return;

    const count = await Seq.increment('Table');
    this._id = count;
});

const Table = mongoose.model("Table", TableSchema);

module.exports = {
    Table,
    TableSchema,
};
