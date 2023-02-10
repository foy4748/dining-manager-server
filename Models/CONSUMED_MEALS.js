const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const consumedMealSchemaObj = {
  card_no: String,
  User_id: ObjectId,
  committee_no: String,
  date_of_consumption: {
    type: String,
    validate: /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/gm,
  },
};

const consumedMealSchema = new Schema(consumedMealSchemaObj, {
  timestamps: true,
});

const CONSUMED_MEAL = mongoose.model("consumed_meal", consumedMealSchema);

module.exports = CONSUMED_MEAL;
