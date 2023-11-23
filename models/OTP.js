const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");
const { Seq } = require("./Seq");
const { boolean } = require("yup");

const OTPSchema = new Schema(
    {
        _id: {
            type: String,
            alias: "id",
        },
        otp: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            required: true
        }
    },
    { timestamps: true }
);

OTPSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: "all",
});

OTPSchema.pre('save', async function () {
    // Don't increment if this is NOT a newly created document
    if (!this.isNew) return;

    const count = await Seq.increment('OTP');
    this._id = count;
});


const OTP = mongoose.model("OTP", OTPSchema);

module.exports = {
    OTP,
    OTPSchema,
};
