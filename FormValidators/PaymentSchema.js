const { check } = require("express-validator");
const commonForeignKeys = require("./CommonForeignKeys");

const paymentObjectValidation = [
  check("payment_amount").exists().isNumeric().isLength({ max: 10 }),
  ...commonForeignKeys,
];

module.exports = paymentObjectValidation;
