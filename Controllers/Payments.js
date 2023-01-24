const express = require("express");

const router = express.Router();

// importing Models
const PAYMENT = require("../Models/PAYMENTS");

router.get("/", async (req, res) => {
  const records = await PAYMENT.find({});
  return res.send({ message: "Payments API endpoint working", records });
});

module.exports = router;
