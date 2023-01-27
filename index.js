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
const ActivateMealAPI = require("./Controllers/Activation_Request");
const DeactivateMealAPI = require("./Controllers/Deactivation_Request");
const ConsumedMealAPI = require("./Controllers/Consumed_Meals")
const ActiveMealsAPI = require("./Controllers/Active_Meals");

// Using Routers
app.use("/payments", PaymentsAPI);
app.use("/activate-meal", ActivateMealAPI);
app.use("/deactivate-meal", DeactivateMealAPI);
app.use("/consumed-meal", ConsumedMealAPI);
app.use("/active-meals", ActiveMealsAPI);

app.get("/", (req, res) => {
	return res.send({message: "DINING MANAGER SERVER is UP and RUNNING"});
});

app.listen(PORT, () =>
	console.log(`DINING MANAGER SERVER running at PORT ${PORT}`)
);
