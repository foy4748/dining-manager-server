const express = require("express");
const {validationResult} = require("express-validator");

const router = express.Router();

// Importing Models
const CONSUMED_MEAL = require("../Models/CONSUMED_MEALS");

// Importing Consumed Meal Object Schema
const consumedMealObjectValidation = require("../FormValidators/ConsumedMealSchema");

router.get("/", async (req, res) => {
	try {

		const records = await CONSUMED_MEAL.find({});
		return res.send({message: "Consumed Meal API endpoint working", records});
	} catch (error) {
		console.error(error);
		return res.send({message: "Failed"})
	}
});

router.post("/", consumedMealObjectValidation, async (req, res) => {
	const error = validationResult(req).formatWith(({msg}) => msg);
	const hasError = !error.isEmpty();

	if (hasError) {
		return res
			.status(403)
			.send({error: true, message: "Invalid CONSUMED_MEAL Payload"});
	}

	try {
		const newPaymentEntry = new CONSUMED_MEAL(req.body);
		const response = await newPaymentEntry.save();
		response["message"] = "Successfully POSTED payment info";
		return res.send(response);
	} catch (error) {
		console.error(error);
		return res
			.status(501)
			.send({error: true, message: "FAILED to  POST consumed meal info"});
	}
});

module.exports = router;

