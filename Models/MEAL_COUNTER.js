const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const mealCounterSchemaObj = {
  card_no: String,
  User_id: ObjectId,
  committee_no: String,
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

class MealCounterClass {
  constructor(card_no, User_id, committee_no) {
    this.card_no = card_no;
    this.User_id = User_id;
    this.committee_no = committee_no;
    this.meal_count = {
      regular_meals: 0,
      friday_meals: 0,
      feast: 0,
    };
    this.extra_meals = {
      regular_meals: 0,
      friday_meals: 0,
      feast: 0,
    };
  }
}

const mealCounterSchema = new Schema(mealCounterSchemaObj, {
  timestamps: true,
});

const MEAL_COUNTER = mongoose.model("meal_counter", mealCounterSchema);

module.exports = { MEAL_COUNTER, MealCounterClass };
