const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const paymentSchemaObj = {
  payment_amount: Number,
  User_id: ObjectId,
  card_no: String,
  committee_no: Number,
  payment_date: {
    type: String,
    validate: /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/gm,
  },
};

const paymentSchema = new Schema(paymentSchemaObj, { timestamps: true });

const PAYMENT = mongoose.model("payment", paymentSchema);

module.exports = PAYMENT;
