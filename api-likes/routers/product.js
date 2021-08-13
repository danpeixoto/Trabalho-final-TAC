const auth = require("../middleware/auth");
const Product = require("../models/Product");



const handleLike = async (req, res, next) => {

	const { stars, productId } = req.body;

	try {

		let product = await Product.findOne({ productId });

		if (product) {
			let likes = product.likes.filter(like => like.user !== req.user.id);

			likes.push({ user: req.user.id, stars: stars });

			product = await Product.findOneAndUpdate(
				{ productId },
				{
					likes,
				},
				{ new: true }
			);


			res.send(product);
			return next();
		}

		product = new Product({
			productId,
			likes: [{ stars, user: req.user.id }]
		});

		await product.save();

		res.send(product);
		next();
	} catch (err) {
		console.error(err.message);
		res.send(500, "Server Error");
	}

};


const productRouter = (server) => {
	server.post("/like", [auth, handleLike]);
};





module.exports = productRouter;
