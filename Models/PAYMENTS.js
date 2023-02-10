const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const paymentSchemaObj = {
  payment_amount: Number,
  User_id: ObjectId,
  card_no: String,
  committee_no: Number,
  payment_date: String,
};

const paymentSchema = new Schema(paymentSchemaObj, { timestamps: true });

const PAYMENT = mongoose.model("payment", paymentSchema);

module.exports = PAYMENT;
