const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");
const { Seq } = require("./Seq");

const StaffSchema = new Schema(
  {
    id: { type: String, required: true },
    fullName: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minLength: 6,
      maxLength: 70,
      required: true,
      validate: {
        validator: (value) =>
          /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value),
        message:
          "Password requires a number, a lowercase letter, an uppercase letter, a symbol & 6 characters minimum",
      },
    },
  },
  { timestamps: true }
);

StaffSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

StaffSchema.pre('save', async function () {
  // Don't increment if this is NOT a newly created document
  if (!this.isNew) return;

  const count = await Seq.increment('Staff');
  this._id = count;
});

const Staff = mongoose.model("Staff", StaffSchema);

module.exports = {
  Staff,
  StaffSchema,
};
