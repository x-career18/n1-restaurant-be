const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");
const { Seq } = require("./Seq");

const PaymentSchema = new Schema(
  {
    _id: {
      type: Number,
      alias: "id",
    },
    restaurantId: {
      type: Number,
      required: true,
    },
    userId: {
      type: Number,
      required: true,
    },
    payment: {
      type: [{
        _id: false,
        method: String,
        value: Number
      }],
      required: true,
    },
    orderId: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

PaymentSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

PaymentSchema.pre('save', async function () {
  // Don't increment if this is NOT a newly created document
  if (!this.isNew) return;

  const count = await Seq.increment('Payment');
  this._id = count;
});

const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = {
  Payment,
  PaymentSchema,
};
