const adminAuth = require("../middleware/adminAuth");
const express = require("express");
const {check, validationResult}  = require("express-validator");
const router = express.Router();
const Product = require("../database/models/Product");


// @route POST /product/
// @desc Create new product
// @access Private
router.post("/",[adminAuth,
[
	check("name","Please include a name").not().isEmpty(),
	check("category","Please include a category").not().isEmpty(),
	check("total_available","Please include an integer").isInt(),
	check("value","Please include a floating-point value").isFloat(),
]
], 
async (req,res)=>{
	const errors = validationResult(req);

	if(!errors.isEmpty()){
		return res.status(400).json({errors:errors.array()});
	}

	const {name,category,total_available,value} = req.body;

	try {
		const newProduct = await Product.create({name,category,total_available,value});

		res.json(newProduct);
	} catch (err) {
		console.log(err.message);
		res.status(500).send("Server error...");
	}

});

// @route PUT /product/:product_id
// @desc Update a product by it's id
// @access Private
router.put("/:product_id",[adminAuth,
	[
		check("name","Please include a name").not().isEmpty(),
		check("category","Please include a category").not().isEmpty(),
		check("total_available","Please include an integer").isInt(),
		check("value","Please include a floating-point value").isFloat(),
	]
	], 
	async (req,res)=>{
		const errors = validationResult(req);
	
		if(!errors.isEmpty()){
			return res.status(400).json({errors:errors.array()});
		}
	
		const {name,category,total_available,value} = req.body;
		const product_id = req.params.product_id;
		try {
			const productExists = await Product.findByPk(product_id);
		
			if(!productExists){
				return res.status(400).json({
					errors:[{msg:"Product not found"}]
				});
			}

			const product = await Product.update({name,category,total_available,value},{where:{id:product_id},returning:true});
		
			res.json(product[1][0]);
		} catch (err) {
			console.log(err.message);
			res.status(500).send("Server error...");
		}
	
	});

module.exports = router;
