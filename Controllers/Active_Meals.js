const express = require("express");
const {validationResult} = require("express-validator");

const router = express.Router();

// Importing Models
const ACTIVE_MEAL = require("../Models/ACTIVE_MEALS");

// Importing Payment Object Schema
const activeMealsValidation = require("../FormValidators/ActiveMealSchema");

router.post("/", activeMealsValidation, async (req, res) => {
	const error = validationResult(req).formatWith(({msg}) => msg);
	const hasError = !error.isEmpty();

	if (hasError) {
		return res
			.status(403)
			.send({error: true, message: "Invalid ACTIVATE MEAL payload"});
	}

	try {
		const newActivationEntry = new ACTIVE_MEAL(req.body);
		const response = await newActivationEntry.save();
		response["message"] = "Successfully POSTED activation info";
		return res.send(response);
	} catch (error) {
		console.error(error);
		return res.status(501).send({
			error: true,
			message: "FAILED to  POSTED requestion activation info",
		});
	}
});

module.exports = router;

