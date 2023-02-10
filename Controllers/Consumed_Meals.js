const express = require("express");
const { validationResult } = require("express-validator");
const moment = require("moment");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.mongo;

const router = express.Router();

// Importing Models
const CONSUMED_MEAL = require("../Models/CONSUMED_MEALS");
const DEACTIVATION_REQUEST = require("../Models/DEACTIVATION_REQUESTS");

// Importing Consumed Meal Object Schema
const consumedMealObjectValidation = require("../FormValidators/ConsumedMealSchema");

router.get("/", async (req, res) => {
  try {
    const records = await CONSUMED_MEAL.find({});
    return res.send({ message: "Consumed Meal API endpoint working", records });
  } catch (error) {
    console.error(error);
    return res.send({ message: "Failed" });
  }
});

router.post("/", consumedMealObjectValidation, async (req, res) => {
  const error = validationResult(req).formatWith(({ msg }) => msg);
  const hasError = !error.isEmpty();

  if (hasError) {
    return res
      .status(403)
      .send({ error: true, message: "Invalid CONSUMED_MEAL Payload" })
      .end();
  }

  try {
    const newConsumedMealEntry = new CONSUMED_MEAL(req.body);
    const response = await newConsumedMealEntry.save();
    let { card_no, User_id } = req.body;
    User_id = new ObjectId(User_id);

    const tomorrow = moment().add(1, "days");
    const deactivation_start_date = moment(tomorrow).format("YYYY-MM-DD");

    const query = {
      User_id,
      card_no,
      deactivation_start_date,
    };

    const isDeactivated = await DEACTIVATION_REQUEST.findOne(query);

    if (isDeactivated) {
      return res
        .send({
          message:
            "Meal is DEACTIVATED tomorrow. Successfully POSTED Consumed Meal info.",
        })
        .end();
    } else {
      response["message"] = "Successfully POSTED Consumed Meal info";
      return res.send(response).end();
    }
  } catch (error) {
    console.error(error);
    return res
      .status(501)
      .send({ error: true, message: "FAILED to  POST consumed meal info" })
      .end();
  }
});

module.exports = router;
