const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  player: {
    type: String,
    require: true,
  },
  chosenWeather: {
    type: String,
    require: true,
  },
  actualWeather: {
    type: String,
    require: true,
  },
  won: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Event", eventSchema);
