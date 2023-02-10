const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const mealCounterSchemaObj = {
  card_no: String,
  User_id: ObjectId,
  committee_no: String,
  active_date: String,
  meal_count: {
    regular_meals: { type: Number, default: 0 },
    friday_meals: { type: Number, default: 0 },
    feast: { type: Number, default: 0 },
  },
  extra_meals: {
    regular_meals: { type: Number, default: 0 },
    friday_meals: { type: Number, default: 0 },
    feast: { type: Number, default: 0 },
  },
};

const mealCounterSchema = new Schema(mealCounterSchemaObj, {
  timestamps: true,
});

const MEAL_COUNTER = mongoose.model("active_meal", mealCounterSchema);

module.exports = MEAL_COUNTER;
