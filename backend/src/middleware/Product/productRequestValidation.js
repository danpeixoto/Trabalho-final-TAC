const { check } = require("express-validator");
const {
  SearchedNameError,
  NameError,
  CategoryError,
  TotalAvailableError,
  ValueError,
  DescriptionError,
} = require("../../utils/error-messages/RequestBodyErros");

const validateProductSearchRules = () => {
  return [check("searched_name", SearchedNameError).not().isEmpty()];
};

const validateProductCreateRules = () => {
  return [
    check("name", NameError).not().isEmpty(),
    check("category", CategoryError).not().isEmpty(),
    check("total_available", TotalAvailableError).isInt(),
    check("value", ValueError).isFloat(),
    check("description", DescriptionError).not().isEmpty(),
  ];
};

const validateProductUpdateRules = () => {
  return [
    check("name", NameError).not().isEmpty(),
    check("category", CategoryError).not().isEmpty(),
    check("total_available", TotalAvailableError).isInt(),
    check("value", ValueError).isFloat(),
    check("description", DescriptionError).not().isEmpty(),
  ];
};

module.exports = {
  validateProductSearchRules,
  validateProductCreateRules,
  validateProductUpdateRules,
};
