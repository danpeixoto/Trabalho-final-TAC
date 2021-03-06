const { check } = require("express-validator");
const {
  NameError,
  EmailError,
  PasswordError,
} = require("../../utils/error-messages/RequestBodyErros");

const validateUserCreateRules = () => {
  return [
    check("name", NameError).not().isEmpty(),
    check("email", EmailError).isEmail(),
    check("password", PasswordError).isLength({
      min: 8,
    }),
  ];
};

module.exports = {
  validateUserCreateRules,
};
