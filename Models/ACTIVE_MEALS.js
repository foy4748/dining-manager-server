const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const activeMealSchemaObj = {
  card_no: String,
  User_id: ObjectId,
  committee_no: String,
  active_date: {
    type: String,
    validate: /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/gm,
  },
};

const activeMealSchema = new Schema(activeMealSchemaObj, { timestamps: true });

const ACTIVE_MEAL = mongoose.model("active_meal", activeMealSchema);

module.exports = ACTIVE_MEAL;
