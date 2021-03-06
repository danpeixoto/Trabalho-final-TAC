const config = require("config");
const jwt = require("jsonwebtoken");


const auth = (req, res, next) => {

	const token = req.header("x-auth-token");

	if (!token) {
		res.send(401, { msg: "Autorização negada..." });
	}

	try {
		const decoded = jwt.verify(token, config.get("jwtSecret"));

		req.user = decoded.user;
		next();
	} catch (err) {
		res.send(401, { msg: "Autorização negada..." });
	}

};



module.exports = auth;
