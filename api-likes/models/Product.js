const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productId: {
    required: true,
    type: Number,
  },
  likes: [
    {
      user: {
        required: true,
        type: Number,
      },
      stars: {
        required: true,
        type: Number,
      },
    },
  ],
  avg_likes: {
    default: 0.0,
    type: Number,
  },
});

module.exports = Products = mongoose.model("products", ProductSchema);
