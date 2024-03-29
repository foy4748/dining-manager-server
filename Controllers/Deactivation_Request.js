const express = require("express");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const router = express.Router();

// Importing Models
const DEACTIVATION_REQUESTS = require("../Models/DEACTIVATION_REQUESTS");
const ACTIVE_MEAL = require("../Models/ACTIVE_MEALS");
const { MEAL_COUNTER, decreaseCount } = require("../Models/MEAL_COUNTER");

// Importing Payment Object Schema
const deactivationRequestValidation = require("../FormValidators/DeactivationRequestSchema");
const ErrorHandlingMW = require("../Middlewares/ErrorHandlingMW");

router.get("/", async (req, res, nxt) => {
  const { card_no, user_id } = req.headers;
  try {
    const response = await DEACTIVATION_REQUESTS.find({
      card_no,
      User_id: new ObjectId(user_id),
    });
    return res.send(response);
  } catch (error) {
    res.status(501);
    res.msg = "FAILED to  GET  deactivation data";
    nxt(error);
  }
});

router.post("/", deactivationRequestValidation, async (req, res, nxt) => {
  const error = validationResult(req).formatWith(({ msg }) => msg);
  const hasError = !error.isEmpty();

  if (hasError) {
    res.status(403);
    res.msg = "Invalid DEACTIVATION REQUEST payload";
    const error = { error: true, message: req.msg };
    nxt(error);
  }

  try {
    const { card_no, deactivation_start_date, committee_no, User_id } =
      req.body;
    //Checking if Meal is already deactivated
    const isDeactivated = await DEACTIVATION_REQUESTS.findOne({
      card_no,
      committee_no,
      User_id: new ObjectId(User_id),
      deactivation_start_date,
    });

    // If alread De-activated, then send Response
    if (isDeactivated) {
      return res.send({
        alreadyExists: true,
        message: `Meal is already De-activated from ${deactivation_start_date}`,
      });
    }

    const newDeactivationEntry = new DEACTIVATION_REQUESTS(req.body);
    const response = await newDeactivationEntry.save();
    response["message"] = "Successfully POSTED deactivation info";

    const activeMealQuery = {
      card_no,
      User_id: new ObjectId(User_id),
      active_date: deactivation_start_date,
    };

    const counterQuery = {
      card_no,
      User_id: new ObjectId(User_id),
      committee_no,
    };

    const isActivated = await ACTIVE_MEAL.findOne(activeMealQuery);

    // console.log("isActivated");
    // console.log(isActivated);

    // [IMPORTANT] Supposed to receive from FrontEnd in Request Object
    // const meal_type = { type: "friday_meals", extra_meal: false };

    if (isActivated) {
      const isFoundCounter = await MEAL_COUNTER.findOne(counterQuery);

      // Decreasing Meal Count in Blank Counter
      // May Require to IMPLEMENT meal or extra-meal selective deactivation
      Object.keys(isFoundCounter.meal_count).forEach((type) => {
        decreaseCount(
          isFoundCounter.meal_count,
          type,
          isActivated.meal_count[type]
        );
      });

      Object.keys(isFoundCounter.extra_meals).forEach((type) => {
        decreaseCount(
          isFoundCounter.extra_meals,
          type,
          isActivated.extra_meals[type]
        );
      });

      console.log("Decreasing MealCount");
      // Updating Decreased Meal Count
      const updatedResponse = await MEAL_COUNTER.findOneAndUpdate(
        { _id: isFoundCounter._id },
        isFoundCounter
      );
      console.log("updatedResponse");
      console.log(updatedResponse);

      await ACTIVE_MEAL.deleteOne({
        _id: new ObjectId(isActivated._id),
      });

      response["message"] =
        "Successfully POSTED deactivation info & Deleted from Active Meal List";
    }
    return res.send(response);
  } catch (error) {
    console.error(error);
    res.status(501);
    res.msg = "FAILED to  POSTED requestion deactivation info";
    nxt(error);
  }
});

router.use(ErrorHandlingMW);
module.exports = router;
