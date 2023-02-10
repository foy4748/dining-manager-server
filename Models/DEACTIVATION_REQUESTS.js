const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const deactivationRequestSchemaObj = {
  User_id: ObjectId,
  card_no: String,
  committee_no: String,
  deactivation_start_date: String,
  deactivation_end_date: String,
  resolved: {
    type: Boolean,
    default: false,
  },
};

const deactivationRequestSchema = new Schema(deactivationRequestSchemaObj, {
  timestamps: true,
});

const DEACTIVATION_REQUEST = mongoose.model(
  "deactivation_request",
  deactivationRequestSchema
);

module.exports = DEACTIVATION_REQUEST;
