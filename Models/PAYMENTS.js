const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const paymentSchemaObj = {
  payment_amount: Number,
  User_id: ObjectId,
  card_no: String,
  committee_no: Number,
};

const paymentSchema = new Schema(paymentSchemaObj);

const PAYMENT = mongoose.model("payment", paymentSchema);

module.exports = PAYMENT;
