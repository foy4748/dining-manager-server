const express = require("express");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const { ObjectId } = mongoose.Types;

const router = express.Router();

// Importing Models
const ACTIVATION_REQUESTS = require("../Models/ACTIVATION_REQUESTS");

// Importing Payment Object Schema
const activationRequestValidation = require("../FormValidators/ActivationRequestSchema");
const ErrorHandlingMW = require("../Middlewares/ErrorHandlingMW");

router.get("/", async (req, res, nxt) => {
  try {
    const { card_no, user_id } = req.headers;
    const records = await ACTIVATION_REQUESTS.find({
      card_no,
      User_id: new ObjectId(user_id),
    });
    res.send({ records });
  } catch (error) {
    res.status(501);
    res.msg = "FAILED to  GET activation request info";
    nxt(error);
  }
});

router.post("/", activationRequestValidation, async (req, res, nxt) => {
  const error = validationResult(req).formatWith(({ msg }) => msg);
  const hasError = !error.isEmpty();

  if (hasError) {
    res.status(403);
    res.msg = "Invalid ACTIVATION REQUEST payload";
    error = { error: true, message: res.msg };
    nxt(error);
  }

  try {
    const newActivationEntry = new ACTIVATION_REQUESTS(req.body);
    const response = await newActivationEntry.save();
    response["message"] = "Successfully POSTED activation info";
    return res.send(response);
  } catch (error) {
    res.status(501);
    res.msg = "FAILED to  POSTED activation requestion info";
    nxt(error);
  }
});

router.use(ErrorHandlingMW);

module.exports = router;
