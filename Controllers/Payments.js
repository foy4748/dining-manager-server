const express = require("express");
const { validationResult } = require("express-validator");

const router = express.Router();

// Importing Models
const PAYMENT = require("../Models/PAYMENTS");

// Importing Payment Object Schema
const paymentObjectValidation = require("../FormValidators/PaymentSchema");
const ErrorHandlingMW = require("../Middlewares/ErrorHandlingMW");

router.get("/", async (req, res, nxt) => {
  try {
    const records = await PAYMENT.find({});
    return res.send({ message: "Payments API endpoint working", records });
  } catch (error) {
    res.status(501);
    res.msg = "FAILED to GET PAYMENT records";
    nxt(error);
  }
});

router.post("/", paymentObjectValidation, async (req, res, nxt) => {
  const error = validationResult(req).formatWith(({ msg }) => msg);
  const hasError = !error.isEmpty();

  if (hasError) {
    return res
      .status(403)
      .send({ error: true, message: "Invalid PAYMENT Payload" });
  }

  try {
    const newPaymentEntry = new PAYMENT(req.body);
    const response = await newPaymentEntry.save();
    response["message"] = "Successfully POSTED payment info";
    return res.send(response);
  } catch (error) {
    res.status(501);
    res.msg = "FAILED to  POST payment info";
    nxt(error);
  }
});

router.use(ErrorHandlingMW);
module.exports = router;
