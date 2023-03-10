const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const activationRequestSchemaObj = {
  User_id: ObjectId,
  card_no: String,
  committee_no: String,
  activation_date: String,
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
