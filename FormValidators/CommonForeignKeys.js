const { check } = require("express-validator");

const commonForeignKeys = [
  check("User_id").exists().isString().isLength({ min: 24, max: 24 }),
  check("card_no").exists().isString().isLength({ max: 8 }),
  check("committee_no").exists().isString().isLength({ max: 8 }),
];

module.exports = commonForeignKeys;
