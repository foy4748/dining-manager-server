const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Types;

const consumedMealSchemaObj = {
  card_no: String,
  User_id: ObjectId,
  committee_no: String,
  date_of_consumption: String,
};

const consumedMealSchema = new Schema(consumedMealSchemaObj, {
  timestamps: true,
});

const CONSUMED_MEAL = mongoose.model("consumed_meal", consumedMealSchema);

module.exports = CONSUMED_MEAL;
