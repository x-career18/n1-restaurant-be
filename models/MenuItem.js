const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");
const { Seq } = require("./Seq");

const MenuItemSchema = new Schema(
  {
    _id: {
      type: Number,
      alias: "id",
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["đồ nướng", "đồ uống", "đồ thui", "đồ chay", "all"]
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
    status: {
      type: Number,
    },
  },
  { timestamps: true }
);

MenuItemSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

MenuItemSchema.pre('save', async function () {
  // Don't increment if this is NOT a newly created document
  if (!this.isNew) return;

  const count = await Seq.increment('MenuItemSchema');
  this._id = count;
});

const MenuItem = mongoose.model("MenuItem", MenuItemSchema);

module.exports = {
  MenuItem,
  MenuItemSchema,
};
