const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");

const RestaurantSchema = new Schema(
  {
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

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

module.exports = {
  Restaurant,
  RestaurantSchema,
};
