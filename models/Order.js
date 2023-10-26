const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");
const { Seq } = require("./Seq");

const OrderSchema = new Schema(
  {
    _id: {
      type: Number,
      alias: "id",
    },
    item: String,
    quantity: Number,
    discount: Number,
    total: Number,
  },
  { timestamps: true }
);

OrderSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

OrderSchema.pre('save', async function () {
  // Don't increment if this is NOT a newly created document
  if (!this.isNew) return;

  const count = await Seq.increment('Order');
  this._id = count;
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = {
  Order,
  OrderSchema,
};
