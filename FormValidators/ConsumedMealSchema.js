const {check} = require("express-validator");
const commonForeignKeys = require("./CommonForeignKeys");

const consumedMealObject = [
	...commonForeignKeys,
	check("date_of_consumption").isISO8601().toDate(),
];

module.exports = consumedMealObject;

