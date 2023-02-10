const { check } = require("express-validator");
const commonForeignKeys = require("./CommonForeignKeys");

const paymentObjectValidation = [
  ...commonForeignKeys,
  check("payment_amount").exists().isNumeric().isLength({ max: 10 }),
  check("payment_date").matches(
    /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/gm
  ),
];

module.exports = paymentObjectValidation;
