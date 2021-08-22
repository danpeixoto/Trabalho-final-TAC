const express = require("express");
const Sale = require("../database/models/Sale");
const SaleItem = require("../database/models/SaleItem");
const Product = require("../database/models/Product");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const router = express.Router();

// @route GET /sale
// @desc Get all purchaces made by user
// @access Private

router.get("/", auth, async (req, res) => {
  try {
    const { id: user_id } = req.user;
    const sales = await Sale.findAll({ where: { user_id } });

    res.json(sales);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error...");
  }
});

// @route GET /sale/:sale_id
// @desc Get all items based on sale_id
// @access Private

router.get("/:sale_id", auth, async (req, res) => {
  try {
    const sale = await Sale.findByPk(req.params.sale_id);

    if (!sale) {
      return res.status(400).json({ msg: "Sale not found" });
    }

    const saleItems = await SaleItem.findAll({ where: { sale_id: sale.id } });

    res.json({
      ...saleItems,
      total_value: sale.total_value,
      total_items: sale.total_items,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error...");
  }
});

// @route POST /sale
// @desc Create new sale
// @access Private
router.post(
  "/",
  [
    auth,
    [
      check(
        "products",
        "Please include a valid product array, containing at least one product",
      )
        .isArray()
        .isLength({ min: 1 }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { products } = req.body;
    const { id: user_id } = req.user;
    try {
      const total_items = products
        .map((product) => product.amount)
        .reduce((acc, cur) => acc + cur);
      let sale = await Sale.create({
        user_id,
        total_items,
        sale_date: Date.now(),
        total_value: 0,
      });
      const saleItems = [];
      // TODO: pedir para o professor a melhor maneira de implementar essa parte
      for (let product of products) {
        console.log(product.id);
        let productResult = await Product.findByPk(product.id);

        let saleItem = await SaleItem.create({
          sale_id: sale.id,
          product_id: productResult.id,
          amount: product.amount,
          value: productResult.value,
        });

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
      res.status(500).send("Server error...");
    }
  },
);

module.exports = router;
