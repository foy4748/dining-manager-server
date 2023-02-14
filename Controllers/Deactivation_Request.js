const express = require("express");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const router = express.Router();

// Importing Models
const DEACTIVATION_REQUESTS = require("../Models/DEACTIVATION_REQUESTS");
const ACTIVE_MEAL = require("../Models/ACTIVE_MEALS");
const MEAL_COUNTER = require("../Models/MEAL_COUNTER");

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
    const { card_no, deactivation_start_date, committee_no, User_id } =
      req.body;
    const query = {
      card_no,
      User_id: new ObjectId(User_id),
      active_date: deactivation_start_date,
    };
    const isActivated = await ACTIVE_MEAL.findOne(query);
    if (isActivated) {
      const decreaseCounter = await MEAL_COUNTER.findOneAndUpdate(
        { card_no, User_id: new ObjectId(User_id), committee_no },
        { meal_count: { $inc: { regular_meals: -1 } } },
        { upsert: true }
      );
      const deleteResponse = await ACTIVE_MEAL.deleteOne({
        _id: new ObjectId(isActivated._id),
      });
      response["message"] =
        "Successfully POSTED deactivation info & Deleted from Active Meal List";
    }
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
