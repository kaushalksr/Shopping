const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productPrice: {
      type: Number,
      required: true,
    },
    productRating: {
      type: Number,
      required: true,
    },
    productImage: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    productDiscount: {
      type: Number,
      required: true,
    },
    productDeliveryCharge: {
      type: Number,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    productCategory: {
      type: String,
      enum: ["Men", "Women", "Kid"],
    },
    productQuantity: Number,
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
