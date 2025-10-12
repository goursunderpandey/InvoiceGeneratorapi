const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
    supplierName: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    city: { type: String },
    country: { type: String },
    description: { type: String }
}, { timestamps: true });

module.exports =  mongoose.model("Supplier", supplierSchema);
