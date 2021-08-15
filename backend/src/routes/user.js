const express = require("express");
const router = express.Router();
const User = require("../database/models/User");

router.get("/", async (req, res) => {
	try {
		const user = await User.create({ name: "Daniel", email: "daniel", password: "Daniel", is_admin: "no" });
		res.json(user);
	} catch (error) {
		console.error(error.message);
		res.send(error.message);
	}
});


module.exports = router;
