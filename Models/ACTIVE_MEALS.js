const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const activeMealSchemaObj = {
  card_no: String,
  User_id: ObjectId,
  committee_no: String,
  active_date: String,
};

const activeMealSchema = new Schema(activeMealSchemaObj, { timestamps: true });

const ACTIVE_MEAL = mongoose.model("active_meal", activeMealSchema);

module.exports = ACTIVE_MEAL;
