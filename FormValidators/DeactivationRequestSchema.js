const { check } = require("express-validator");
const commonForeignKeys = require("./CommonForeignKeys");

const deactivationRequestObject = [
  ...commonForeignKeys,
  check("deactivation_start_date").matches(
    /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/gm
  ),
  check("deactivation_end_date").matches(
    /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/gm
  ),
];

module.exports = deactivationRequestObject;
