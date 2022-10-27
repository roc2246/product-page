const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  sale: {
    type: Boolean,
    required: true,
  },
  discount: {
    type: Number,
    required: true
  },
  totalprice: {
    type: Number,
    required: true
  },
  images: {
    type: Array,
    required: true
  },
  thumbnails: {
    type: Array,
    required: true
  }
});

const Product = mongoose.model("Product", productSchema)
module.exports = Product