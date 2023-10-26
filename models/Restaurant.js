const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");
const { Seq } = require("./Seq");

const RestaurantSchema = new Schema(
  {
    _id: {
      type: Number,
      alias: "id",
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    openingTime: {
      type: String,
      required: true,
    },
    closingTime: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

RestaurantSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

RestaurantSchema.pre('save', async function () {
  // Don't increment if this is NOT a newly created document
  if (!this.isNew) return;

  const count = await Seq.increment('Restaurant');
  this._id = count;
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

module.exports = {
  Restaurant,
  RestaurantSchema,
};
