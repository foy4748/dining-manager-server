const express = require("express");
const { validationResult } = require("express-validator");

const router = express.Router();

// Importing Models
const ACTIVATION_REQUESTS = require("../Models/ACTIVATION_REQUESTS");

// Importing Payment Object Schema
const activationRequestValidation = require("../FormValidators/ActivationRequestSchema");
const ErrorHandlingMW = require("../Middlewares/ErrorHandlingMW");

router.post("/", activationRequestValidation, async (req, res, nxt) => {
  const error = validationResult(req).formatWith(({ msg }) => msg);
  const hasError = !error.isEmpty();

  if (hasError) {
    return res
      .status(403)
      .send({ error: true, message: "Invalid ACTIVATION REQUEST payload" });
  }

  try {
    const newActivationEntry = new ACTIVATION_REQUESTS(req.body);
    const response = await newActivationEntry.save();
    response["message"] = "Successfully POSTED activation info";
    return res.send(response);
  } catch (error) {
    res.status_code = 501;
    res.msg = "FAILED to  POSTED requestion activation info";
    nxt(error);
  }
});

router.use(ErrorHandlingMW);

module.exports = router;
