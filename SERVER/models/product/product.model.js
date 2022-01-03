const { Schema, model } = require("mongoose");

//token is used as an authorization middleware

const ProductSchema = new Schema({
  productName: {
    type: String,
    trim: true,
    required: true,
  },
  price: {
    type: Number,
    trim: true,
    required: true,
  },
  picture: {
    type: String,
  },
  description: {
    type: String,
    default: null,
  },
});

const ProductModal = model("prodct", ProductSchema);

module.exports = ProductModal;
