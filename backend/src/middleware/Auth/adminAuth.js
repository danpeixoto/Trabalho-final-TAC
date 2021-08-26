const config = require("config");
const jwt = require("jsonwebtoken");
const {
  HackerAccess,
  NoToken,
  InvalidToken,
} = require("../../utils/error-messages/AuthErrors");
const { errorFactory } = require("../../utils/error/errorFactory");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json(errorFactory(NoToken));
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    if (decoded.user.is_admin !== config.get("adminSecret")) {
      return res.status(401).json(errorFactory(HackerAccess));
    }

    req.user = decoded.user;

    next();
  } catch (err) {
    res.status(401).json(errorFactory(InvalidToken));
  }
};
