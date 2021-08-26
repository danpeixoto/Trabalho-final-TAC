const { check } = require("express-validator");
const {
  EmailError,
  PasswordError,
} = require("../../utils/error-messages/RequestBodyErros");

const validateLoginRules = () => {
  return [
    check("email", EmailError).isEmail(),
    check("password", PasswordError).exists(),
  ];
};

module.exports = {
  validateLoginRules,
};
