const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    skuId: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    costPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    salePrice: {
      type: Number,
      required: true,
      min: 0,
    },
    profileImage: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);
