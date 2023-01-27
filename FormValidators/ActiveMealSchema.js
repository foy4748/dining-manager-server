const {check} = require("express-validator");
const commonForeignKeys = require("./CommonForeignKeys");

const consumedMealObject = [
	...commonForeignKeys,
	check("active_date").isISO8601().toDate(),
];

module.exports = consumedMealObject;


