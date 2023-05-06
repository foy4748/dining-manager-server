const express = require("express");
const { validationResult } = require("express-validator");
const moment = require("moment");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.mongo;

const router = express.Router();
const ErrorHandlingMW = require("../Middlewares/ErrorHandlingMW");

// Importing Models
const CONSUMED_MEAL = require("../Models/CONSUMED_MEALS");
const DEACTIVATION_REQUEST = require("../Models/DEACTIVATION_REQUESTS");
const ACTIVE_MEAL = require("../Models/ACTIVE_MEALS");
const {
  MEAL_COUNTER,
  MealCounterClass,
  Counter,
  increaseCount,
  decreaseCount,
} = require("../Models/MEAL_COUNTER");

// Importing Consumed Meal Object Schema
const consumedMealObjectValidation = require("../FormValidators/ConsumedMealSchema");

router.get("/", async (req, res, nxt) => {
  try {
    const records = await CONSUMED_MEAL.find({});
    return res.send({ message: "Consumed Meal API endpoint working", records });
  } catch (error) {
    res.status(501);
    res.msg = "FAILED to GET Consumed Meal records";
    nxt(error);
  }
});

router.post("/", consumedMealObjectValidation, async (req, res, nxt) => {
  const error = validationResult(req).formatWith(({ msg }) => msg);
  const hasError = !error.isEmpty();

  if (hasError) {
    res.status(403);
    res.msg = "Invalid CONSUMED_MEAL Payload";
    const error = { error: true, message: res.msg };
    nxt(error);
  }

  try {
    const newConsumedMealEntry = new CONSUMED_MEAL(req.body);
    const response = await newConsumedMealEntry.save();
    let { card_no, User_id, committee_no } = req.body;
    User_id_ObjectId = new ObjectId(User_id);

    let tomorrow = moment().add(1, "days");
    tomorrow = moment(tomorrow).format("YYYY-MM-DD");

    const query = {
      User_id: User_id_ObjectId,
      card_no,
      deactivation_start_date: tomorrow,
    };

    const isDeactivated = await DEACTIVATION_REQUEST.findOne(query);

    // Checking If Meal Deactivation Request was made by User
    if (isDeactivated) {
      return res
        .send({
          message:
            "Meal is DEACTIVATED tomorrow. Successfully POSTED Consumed Meal info.",
        })
        .end();
    }

    delete query["deactivation_start_date"];
    const counterQuery = {
      card_no,
      User_id: User_id_ObjectId,
      committee_no,
    };

    // Selecting Meal Type
    // [IMPORTANT] Supposed to receive from FrontEnd in Request Object
    const meal_type = { type: "friday_meals", extra_meal: false };

    const meal_count = new Counter();
    const extra_meals = new Counter();

    increaseCount(meal_count, meal_type.type, 1);
    const newActiveMealObj = {
      card_no,
      User_id,
      committee_no,
      active_date: tomorrow,
      meal_count,
      extra_meals,
    };

    const newActiveMealEntity = new ACTIVE_MEAL(newActiveMealObj);
    await newActiveMealEntity.save();

    //Checking whether the counter exists or not
    const isFoundCounter = await MEAL_COUNTER.findOne(counterQuery);

    // Initializing Counter if counter is NOT present
    if (!isFoundCounter) {
      const blankCounterObj = new MealCounterClass(
        card_no,
        User_id,
        committee_no
      );

      // Increasing Meal Count in Blank Counter
      blankCounterObj[meal_type.extra_meal ? "extra_meals" : "meal_count"][
        meal_type.type
      ] += 1;
      const blankCounter = new MEAL_COUNTER(blankCounterObj);
      const postResponse = await blankCounter.save();
      console.log(postResponse);
    } else {
      // Increasing Meal Count
      isFoundCounter[meal_type.extra_meal ? "extra_meals" : "meal_count"][
        meal_type.type
      ] += 1;

      // Updating Increased Meal Count
      const updatedResponse = await MEAL_COUNTER.findOneAndUpdate(
        { _id: isFoundCounter._id },
        isFoundCounter
      );
      console.log("updatedResponse");
      console.log(updatedResponse);
    }

    response[
      "message"
    ] = `Successfully POSTED Consumed Meal info. Activated meal for ${tomorrow}`;
    return res.send(response).end();
  } catch (error) {
    res.status(501);
    res.msg = "FAILED to  POST consumed meal info";
    nxt(error);
  }
});

router.use(ErrorHandlingMW);
module.exports = router;
