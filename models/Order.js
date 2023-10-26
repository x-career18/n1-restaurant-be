const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");

const OrderSchema = new Schema(
  {
    item: String,
    quantity: Number,
    discount: Number,
    total: Number,
  }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = {
  Order,
  OrderSchema,
};
