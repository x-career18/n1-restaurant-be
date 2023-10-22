const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");
const { OrderSchema } = require("./Order");

const ReservationSchema = new Schema(
  {
    fullname: String,
    phoneNo: String,
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

const Reservation = mongoose.model("Reservation", ReservationSchema);

module.exports = {
  Reservation,
  ReservationSchema,
};
