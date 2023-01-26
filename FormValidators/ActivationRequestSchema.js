const { check } = require("express-validator");
const commonForeignKeys = require("./CommonForeignKeys");

const activationRequestObject = [
  ...commonForeignKeys,
  check("activation_date").isISO8601().toDate(),
];

module.exports = activationRequestObject;
