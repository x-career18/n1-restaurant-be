const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");

const OwnerSchema = new Schema(
  {
    fullname: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        message: (props) => `${props.value} is not a valid email`,
      },
    },
    phoneNo: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) => /^(\+?\d{1,3}[- ]?)?\d{10}$/.test(value),
        message: (props) => `${props.value} is not a valid phone number`,
      },
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

OwnerSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

const Owner = mongoose.model("Owner", OwnerSchema);

module.exports = {
  Owner,
  OwnerSchema,
};
