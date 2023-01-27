const express = require("express");
const {validationResult} = require("express-validator");

const router = express.Router();

// Importing Models
const PAYMENT = require("../Models/PAYMENTS");

// Importing Payment Object Schema
const paymentObjectValidation = require("../FormValidators/PaymentSchema");

router.get("/", async (req, res) => {
	try {

		const records = await PAYMENT.find({});
		return res.send({message: "Payments API endpoint working", records});
	} catch (error) {
		console.error(error);
		return res.send({message: "Failed"})
	}
});

router.post("/", paymentObjectValidation, async (req, res) => {
	const error = validationResult(req).formatWith(({msg}) => msg);
	const hasError = !error.isEmpty();

	if (hasError) {
		return res
			.status(403)
			.send({error: true, message: "Invalid PAYMENT Payload"});
	}

	try {
		const newPaymentEntry = new PAYMENT(req.body);
		const response = await newPaymentEntry.save();
		response["message"] = "Successfully POSTED payment info";
		return res.send(response);
	} catch (error) {
		console.error(error);
		return res
			.status(501)
			.send({error: true, message: "FAILED to  POSTED payment info"});
	}
});

module.exports = router;
