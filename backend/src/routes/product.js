const adminAuth = require("../middleware/Auth/adminAuth");
const express = require("express");
const router = express.Router();
const Product = require("../database/models/Product");
const { Op } = require("sequelize");
const { ServerError } = require("../utils/error-messages/ServerErrors");
const { errorFactory } = require("../utils/error/errorFactory");
const { ProductNotFound } = require("../utils/error-messages/ProductErros");
const {
  validateProductSearchRules,
  validateProductCreateRules,
  validateProductUpdateRules,
} = require("../middleware/Product/productRequestValidation");
const { validateBody } = require("../middleware/validateBody");

// @route GET /product/search-one/:id
// @desc Get product by id
// @access Public

router.get("/search-one/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(400).json(errorFactory(ProductNotFound));
    }

    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).json(errorFactory(ServerError));
  }
});

// @route GET /product
// @desc Get all products
// @access Public

router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll({
      where: {
        total_available: {
          [Op.gt]: 0,
        },
      },
    });

    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).json(errorFactory(ServerError));
  }
});

// @route Post /product/search
// @desc Get all products like searched name
// @access Public

router.post(
  "/search/",
  [validateProductSearchRules(), validateBody],
  async (req, res) => {
    const { searched_name } = req.body;
    try {
      const products = await Product.findAll({
        where: {
          name: {
            [Op.iLike]: `%${searched_name}%`,
          },
          total_available: {
            [Op.gt]: 0,
          },
        },
      });

      if (!products) {
        return res.status(400).json(errorFactory(ProductNotFound));
      }

      res.json(products);
    } catch (err) {
      console.error(err.message);
      res.status(500).json(ServerError);
    }
  },
);

// @route POST /product/
// @desc Create new product
// @access Private
router.post(
  "/",
  [adminAuth, validateProductCreateRules(), validateBody],
  async (req, res) => {
    const { name, category, total_available, value, description } = req.body;

    try {
      const newProduct = await Product.create({
        name,
        category,
        total_available,
        value,
        description,
      });

      res.json(newProduct);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error...");
    }
  },
);

// @route PUT /product/:product_id
// @desc Update a product by it's id
// @access Private
router.put(
  "/:product_id",
  [adminAuth, validateProductUpdateRules(), validateBody],
  async (req, res) => {
    const { name, category, total_available, value, description } = req.body;
    const product_id = req.params.product_id;
    try {
      const productExists = await Product.findByPk(product_id);

      if (!productExists) {
        return res.status(400).json({
          errors: [{ msg: "Product not found" }],
        });
      }

      const product = await Product.update(
        { name, category, total_available, value, description },
        { where: { id: product_id }, returning: true },
      );

      res.json(product[1][0]);
    } catch (err) {
      console.log(err.message);
      res.status(500).json(errorFactory(ServerError));
    }
  },
);

module.exports = router;
