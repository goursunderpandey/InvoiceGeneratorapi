const mongoose = require("mongoose");

const PurchaseSchema = new mongoose.Schema({
    SupplierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
    required: true,
  },
  PurchaseDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  PurchaseType: {
    type: String,
    required: true
  },
  Items: [
    {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
      name: { type: String, required: true },
      costPrice: { type: Number, required: true },
      qty: { type: Number, required: true },
    },
  ],
  GrandTotal: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Purchase", PurchaseSchema);
