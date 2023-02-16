const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const activeMealSchemaObj = {
  card_no: String,
  User_id: ObjectId,
  committee_no: String,
  active_date: String,
  meal_count: {
    regular_meals: Number,
    friday_meals: Number,
    feast: Number,
  },
  extra_meals: {
    regular_meals: Number,
    friday_meals: Number,
    feast: Number,
  },
};

const activeMealSchema = new Schema(activeMealSchemaObj, { timestamps: true });

const ACTIVE_MEAL = mongoose.model("active_meal", activeMealSchema);

module.exports = ACTIVE_MEAL;
