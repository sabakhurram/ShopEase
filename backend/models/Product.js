
const mongoose = require("mongoose");

const colorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    hex: {
      type: String,
      required: true,
      match: /^#[0-9A-Fa-f]{6}$/,
    },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: String,
      required: true,
    },

    images: {
      type: [String],
      default: [],
    },

    sizes: {
      type: [String],
      default: [],
    },

    colors: {
      type: [colorSchema],
      default: [],
    },

    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
