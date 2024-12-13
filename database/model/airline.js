const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AIRLINE_Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  no: {
    type: String,
    required: true,
    trim: true,
  },
});

const AIRLINE = mongoose.model("airline", AIRLINE_Schema);
module.exports = AIRLINE;
