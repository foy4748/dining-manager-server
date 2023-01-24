const express = require("express");
require("dotenv").config();
require("./dbConnect");

const app = express();
const morgan = require("morgan");

const PORT = process.env.PORT || 3001;

app.use(morgan("short"));
app.use(express.json());

// Importing Routers
const PaymentsAPI = require("./Controllers/Payments");

// Using Routers
app.use("/payments", PaymentsAPI);

app.get("/", (req, res) => {
  return res.send({ message: "DINING MANAGER SERVER is UP and RUNNING" });
});

app.listen(PORT, () =>
  console.log(`DINING MANAGER SERVER running at PORT ${PORT}`)
);
