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

class Counter {
  constructor(regular_meals = 0, friday_meals = 0, feast = 0) {
    this.regular_meals = regular_meals;
    this.friday_meals = friday_meals;
    this.feast = feast;
  }
}

function increaseCount(counterObj, type, amount) {
  counterObj[type] += amount;
}

function decreaseCount(counterObj, type, amount) {
  counterObj[type] -= amount;
}

class MealCounterClass {
  constructor(card_no, User_id, committee_no) {
    this.card_no = card_no;
    this.User_id = User_id;
    this.committee_no = committee_no;
    this.meal_count = new Counter();
    this.extra_meals = new Counter();
  }
}

const mealCounterSchema = new Schema(mealCounterSchemaObj, {
  timestamps: true,
});

const MEAL_COUNTER = mongoose.model("meal_counter", mealCounterSchema);

module.exports = {
  Counter,
  MEAL_COUNTER,
  MealCounterClass,
  increaseCount,
  decreaseCount,
};
