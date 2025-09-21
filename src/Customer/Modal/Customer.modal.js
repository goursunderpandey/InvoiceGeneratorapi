const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    gstNo: {
      type: String,
      unique: true,
      sparse: true, 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);
