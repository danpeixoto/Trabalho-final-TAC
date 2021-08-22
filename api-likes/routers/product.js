const auth = require("../middleware/auth");
const Product = require("../models/Product");

// @route POST /like
// @desc Create or update a product
// @access Private
const handleLike = async (req, res, next) => {
  const { stars, productId } = req.body;

  try {
    let product = await Product.findOne({ productId });

    if (product) {
      let likes = product.likes.filter((like) => like.user !== req.user.id);

      likes.push({ user: req.user.id, stars: stars });
      const avg_likes =
        likes.map((like) => like.stars).reduce((acc, cur) => acc + cur) /
        likes.length;

      product = await Product.findOneAndUpdate(
        { productId },
        {
          likes,
          avg_likes,
        },
        { new: true },
      );

      res.send(product);
      return next();
    }

    product = new Product({
      productId,
      likes: [{ stars, user: req.user.id }],
      avg_likes: stars,
    });

    await product.save();

    res.send(product);
    next();
  } catch (err) {
    console.error(err.message);
    res.send(500, "Server Error");
  }
};

// @route GET /like/:product_id
// @desc Get item avarage likes by its id
// @access Public
const getItemAvgLike = async (req, res, next) => {
  const { product_id: productId } = req.params;

  try {
    const product = await Product.findOne({ productId });
    if (!product) {
      res.send(400, { msg: "Product not found" });
      return next();
    }

    res.json({ avg_likes: product.avg_likes });
  } catch (err) {
    console.error(err.message);
    res.send(500, "Server Error");
  }
};

const productRouter = (server) => {
  server.post("/like", [auth, handleLike]);
  server.get("/like/:product_id", getItemAvgLike);
};

module.exports = productRouter;
