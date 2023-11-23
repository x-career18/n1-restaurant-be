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
    reservationId: {
      type: Number,
      required: true,
    },
    userId: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      required: true,
    },
    order: {
      type: [{
        _id: false,
        item: String,
        quantity: Number,
        discount: Number,
        costPerUnit: Number,
      }],
    },
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
