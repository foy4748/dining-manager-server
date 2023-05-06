const express = require("express");
const { validationResult } = require("express-validator");

const router = express.Router();

// Importing Models
const ACTIVE_MEAL = require("../Models/ACTIVE_MEALS");

// Importing Payment Object Schema
const activeMealsValidation = require("../FormValidators/ActiveMealSchema");
const ErrorHandlingMW = require("../Middlewares/ErrorHandlingMW");

router.post("/", activeMealsValidation, async (req, res, nxt) => {
  const error = validationResult(req).formatWith(({ msg }) => msg);
  const hasError = !error.isEmpty();

  if (hasError) {
    res.status(403);
    res.msg = "Invalid ACTIVATE MEAL payload";
    const error = { error: true, message: res.msg };
    nxt(error);
  }

  try {
    const newActivationEntry = new ACTIVE_MEAL(req.body);
    const response = await newActivationEntry.save();
    response["message"] = "Successfully POSTED activation info";
    return res.send(response);
  } catch (error) {
    res.status(501);
    res.msg = "FAILED to  POSTED requestion activation info";
    nxt(error);
  }
});

router.use(ErrorHandlingMW);

module.exports = router;
