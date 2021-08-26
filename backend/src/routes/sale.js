const express = require("express");
const Sale = require("../database/models/Sale");
const SaleItem = require("../database/models/SaleItem");
const Product = require("../database/models/Product");
const auth = require("../middleware/Auth/auth");
const { errorFactory } = require("../utils/error/errorFactory");
const { ServerError } = require("../utils/error-messages/ServerErrors");
const {
  SaleNotFound,
  QuantityAboveAvailable,
} = require("../utils/error-messages/SaleErros");
const { ProductNotFound } = require("../utils/error-messages/ProductErros");
const {
  validateSaleCreateRules,
} = require("../middleware/Sale/saleRequestValidation");
const { validateBody } = require("../middleware/validateBody");
const router = express.Router();

// @route GET /sale
// @desc Get all purchaces made by user
// @access Private

router.get("/", auth, async (req, res) => {
  try {
    const { id: user_id } = req.user;
    const sales = await Sale.findAll({
      where: { user_id },
      order: [["id", "DESC"]],
    });

    res.json(sales);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(errorFactory(ServerError));
  }
});

// @route GET /sale/:sale_id
// @desc Get all items based on sale_id
// @access Private

router.get("/:sale_id", auth, async (req, res) => {
  try {
    const sale = await Sale.findByPk(req.params.sale_id);

    if (!sale) {
      return res.status(400).json(errorFactory(SaleNotFound));
    }

    const saleItems = await SaleItem.findAll({
      include: [{ model: Product, as: "product" }],
      where: { sale_id: sale.id },
      nest: true,
    });

    res.json({
      products: [...saleItems],
      total_value: sale.total_value,
      total_items: sale.total_items,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json(errorFactory(ServerError));
  }
});

// @route POST /sale
// @desc Create new sale
// @access Private
router.post(
  "/",
  [auth, validateSaleCreateRules(), validateBody],
  async (req, res) => {
    const { products } = req.body;
    const { id: user_id } = req.user;
    try {
      const total_items = products
        .map((product) => product.amount)
        .reduce((acc, cur) => parseInt(acc, 10) + parseInt(cur, 10));
      let sale = await Sale.create({
        user_id,
        total_items,
        sale_date: Date.now(),
        total_value: 0,
      });

      const saleItems = [];

      for (let product of products) {
        let productResult = await Product.findByPk(product.id);

        if (!productResult) {
          return res.status(400).json(errorFactory(ProductNotFound));
        }

        if (product.amount > productResult.total_available) {
          return res.status(400).json(errorFactory(QuantityAboveAvailable));
        }
      }
      for (let product of products) {
        let productResult = await Product.findByPk(product.id);

        let saleItem = await SaleItem.create({
          sale_id: sale.id,
          product_id: productResult.id,
          amount: product.amount,
          value: productResult.value,
        });

        await Product.update(
          { total_available: productResult.total_available - product.amount },
          { where: { id: productResult.id } },
        );

        saleItems.push(saleItem);
      }

      const total_value = saleItems
        .map((item) => item.value * item.amount)
        .reduce((acc, cur) => acc + cur);

      sale = await Sale.update(
        { total_value },
        { where: { id: sale.id }, returning: true },
      );

      res.json(sale[1][0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).json(errorFactory(ServerError));
    }
  },
);

module.exports = router;
