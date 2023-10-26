const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");
const { OrderSchema } = require("./Order");
const { Seq } = require("./Seq");

const ReservationSchema = new Schema(
  {
    _id: {
      type: Number,
      alias: "id",
    },
    fullname: String,
    phoneNo: String,
    restaurantId: {
      type: Number,
      required: true,
    },
    tableId: {
      type: Array,
      required: true,
    },
    tableCount: {
      type: Number,
      required: true,
    },
    order: [OrderSchema],
    checkinTime: {
      type: Date,
      required: true,
    },
    expiredTime: {
      type: Date,
      required: true,
    },
    status: {
      type: Number,
    },
  },
  { timestamps: true }
);

ReservationSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

ReservationSchema.pre('save', async function () {
  // Don't increment if this is NOT a newly created document
  if (!this.isNew) return;

  const count = await Seq.increment('Reservation');
  this._id = count;
});

const Reservation = mongoose.model("Reservation", ReservationSchema);

module.exports = {
  Reservation,
  ReservationSchema,
};
