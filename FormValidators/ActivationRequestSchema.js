const { check } = require("express-validator");
const commonForeignKeys = require("./CommonForeignKeys");

const activationRequestObject = [
  ...commonForeignKeys,
  check("activation_date").matches(
    /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/gm
  ),
];

module.exports = activationRequestObject;
