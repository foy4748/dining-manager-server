const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const consumedMealSchemaObj = {
  card_no: String,
  User_id: ObjectId,
  committee_no: String,
  date_of_consumption: Date,
};

const consumedMealSchema = new Schema(consumedMealSchemaObj);

const CONSUMED_MEAL = mongoose.model("consumed_meal", consumedMealSchema);

module.exports = CONSUMED_MEAL;
