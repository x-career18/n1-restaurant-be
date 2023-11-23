const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");
const { OrderSchema } = require("./Order");

const ReceiptSchema = new Schema(
  {
    customerName: {
      type: String,
    },
    phoneNo: {
      type: String,
    },
    order: [OrderSchema],
    tableId: {
      type: [String],
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
    paymentMethod: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

ReceiptSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

const Receipt = mongoose.model("Receipt", ReceiptSchema);

module.exports = {
  Receipt,
  ReceiptSchema,
};
