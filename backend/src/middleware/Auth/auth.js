const config = require("config");
const jwt = require("jsonwebtoken");
const {
  InvalidToken,
  NoToken,
} = require("../../utils/error-messages/AuthErrors");
const { errorFactory } = require("../../utils/error/errorFactory");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json(errorFactory(NoToken));
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;

    next();
  } catch (err) {
    res.status(401).json(errorFactory(InvalidToken));
  }
};
