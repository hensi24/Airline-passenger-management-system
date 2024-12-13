const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AIRLINEROUTE_Schema = new Schema({
  origin: {
    type: String,
    required: true,
    trim: true,
  },
  destination: {
    type: String,
    required: true,
    trim: true,
  },
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
  takeoftime: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
});

const AIRLINEROUTE = mongoose.model("airlineroute", AIRLINEROUTE_Schema);
module.exports = AIRLINEROUTE;
