const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const activationRequestSchemaObj = {
  User_id: ObjectId,
  card_no: String,
  committee_no: String,
  activation_date: {
    type: String,
    validate: /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/gm,
  },
  resolved: {
    type: Boolean,
    default: false,
  },
};

const activationRequestSchema = new Schema(activationRequestSchemaObj, {
  timestamps: true,
});

const ACTIVATION_REQUEST = mongoose.model(
  "activation_request",
  activationRequestSchema
);

module.exports = ACTIVATION_REQUEST;
