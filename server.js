require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3501;

connectDB();

app.use(cors()); // Allow all origins

app.use(express.json()); // lets our app receive and parse our json data (damn important)

app.use("/events", require("./routes/eventsRoutes"));

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  // logEvents(
  //   `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
  //   "mongoErrLog.log"
  // ); // creating a new file called mongoErrLog.log
});
