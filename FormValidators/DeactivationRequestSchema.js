const { check } = require("express-validator");
const commonForeignKeys = require("./CommonForeignKeys");

const deactivationRequestObject = [
  ...commonForeignKeys,
  check("deactivation_start_date").isISO8601().toDate(),
  check("deactivation_end_date").isISO8601().toDate(),
];

module.exports = deactivationRequestObject;
