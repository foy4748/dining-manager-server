const express = require("express");
const { validationResult } = require("express-validator");

const router = express.Router();

// Importing Models
const DEACTIVATION_REQUESTS = require("../Models/DEACTIVATION_REQUESTS");

// Importing Payment Object Schema
const deactivationRequestValidation = require("../FormValidators/DeactivationRequestSchema");

router.post("/", deactivationRequestValidation, async (req, res) => {
  const error = validationResult(req).formatWith(({ msg }) => msg);
  const hasError = !error.isEmpty();

  if (hasError) {
    return res
      .status(403)
      .send({ error: true, message: "Invalid DEACTIVATION REQUEST payload" });
  }

  try {
    const newDeactivationEntry = new DEACTIVATION_REQUESTS(req.body);
    const response = await newDeactivationEntry.save();
    response["message"] = "Successfully POSTED deactivation info";
    return res.send(response);
  } catch (error) {
    console.error(error);
    return res.status(501).send({
      error: true,
      message: "FAILED to  POSTED requestion deactivation info",
    });
  }
});

module.exports = router;
