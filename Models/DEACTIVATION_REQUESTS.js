const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const deactivationRequestSchemaObj = {
  User_id: ObjectId,
  card_no: String,
  committee_no: String,
  deactivation_start_date: {
    type: String,
    validate: /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/gm,
  },
  deactivation_end_date: {
    type: String,
    validate: /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/gm,
  },
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
