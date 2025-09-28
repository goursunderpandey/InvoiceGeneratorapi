const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    lastName: { type: String },
    userName: { type: String, required: true, unique: true },
    phone: { type: String },
    address: { type: String },
    country: { type: String },
    state: { type: String },
    city: { type: String },
    postalCode: { type: String },
    profileImage: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Userdetiles", userSchema);
