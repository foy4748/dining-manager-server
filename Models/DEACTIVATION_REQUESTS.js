const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const deactivationRequestSchemaObj = {
  User_id: ObjectId,
  card_no: String,
  committee_no: String,
  deactivation_start_date: Date,
  deactivation_end_date: Date,
};

const deactivationRequestSchema = new Schema(deactivationRequestSchemaObj);

const DEACTIVATION_REQUEST = mongoose.model(
  "deactivation_request",
  deactivationRequestSchema
);

module.exports = DEACTIVATION_REQUEST;
