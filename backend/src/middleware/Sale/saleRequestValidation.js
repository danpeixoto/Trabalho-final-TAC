const { check } = require("express-validator");
const {
  ProductsError,
} = require("../../utils/error-messages/RequestBodyErros");

const validateSaleCreateRules = () => {
  return [check("products", ProductsError).isArray().isLength({ min: 1 })];
};

module.exports = { validateSaleCreateRules };
