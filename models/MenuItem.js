const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");

const MenuItemSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    costPerUnit: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
    },
  },
  { timestamps: true }
);

MenuItemSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

const MenuItem = mongoose.model("MenuItem", MenuItemSchema);

module.exports = {
  MenuItem,
  MenuItemSchema,
};
