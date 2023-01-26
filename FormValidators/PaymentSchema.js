const { check } = require("express-validator");

const paymentObjectValidation = [
  check("payment_amount").exists().isNumeric().isLength({ max: 10 }),
  check("User_id").exists().isString().isLength({ min: 24, max: 24 }),
  check("card_no").exists().isString().isLength({ max: 8 }),
  check("committee_no").exists().isString().isLength({ max: 8 }),
];

module.exports = paymentObjectValidation;
