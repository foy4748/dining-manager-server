const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;

mongoose.connect(URI, () =>
  console.log("MongoDB has been connected SUCCESSFULLY")
);
