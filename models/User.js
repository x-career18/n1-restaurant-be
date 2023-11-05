const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");
const { Seq } = require("./Seq");

const UserSchema = new Schema(
    {
        _id: {
            type: Number,
            alias: "id",
        },
        fullName: { type: String, required: true },
        gender: { type: String, enum: ["male", "female", null] },
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
                    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(value),
                message:
                    "Password requires a number, a lowercase letter, an uppercase letter, a symbol & 6 characters minimum",
            },
        },
        avata: {
            type: String
        },
        restaurantId: {
            type: Number,
        },
        role: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

UserSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: "all",
});

UserSchema.pre('save', async function () {
    // Don't increment if this is NOT a newly created document
    if (!this.isNew) return;

    const count = await Seq.increment('User');
    this._id = count;
});

const User = mongoose.model("User", UserSchema);

module.exports = {
    User,
    UserSchema,
};
