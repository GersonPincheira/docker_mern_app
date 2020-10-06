const { Schema, model } = require("mongoose");

const ProductSchema = new Schema(
  {
    id: {
      type: Number,
    },
    brand: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
    },
    sale: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Product", ProductSchema);
