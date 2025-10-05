const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema({
  CustomerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  SaleDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  SaleType: {
    type: String,
    required: true
  },
  Items: [
    {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
      name: { type: String, required: true },
      costPrice: { type: Number, required: true },
      salePrice: { type: Number, required: true },
      qty: { type: Number, required: true },
    },
  ],
  GrandTotal: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Sale", SaleSchema);
