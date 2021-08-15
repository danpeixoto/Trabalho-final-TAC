const express = require("express");
const router = express.Router();
const Product = require("../database/models/Product");

router.get("/", async (req, res) => {
	try {
		const product = await Product.create({ name: "Daniel", category: "daniel", value: 7.7, total_available: 0 });
		res.json(product);
	} catch (error) {
		console.error(error.message);
		res.send(error.message);
	}
});


module.exports = router;
