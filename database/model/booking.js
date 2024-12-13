const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BOOKING_Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  mno: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    required: true,
    trim: true,
  },
  birthdate: {
    type: Date,
    required: true,
    trim: true,
  },
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
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  // seat: {
  //   type: String,
  //   required: true,
  //   trim: true,
  // },
  seat: {
    type: Number,
    required: true,
    min: [1, "Seat number must be at least 1"],
    max: [30, "Seat number must not exceed 30"],
  },
  aclass: {
    type: String,
    required: true,
    trim: true,
  },
  rdate: {
    type: String,
    required: true,
    trim: true,
  },
  pno: {
    type: String,
    required: true,
    trim: true,
  },
  pname: {
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
    type: String,
    required: true,
    trim: true,
  },
});

const BOOKING = mongoose.model("booking", BOOKING_Schema);
module.exports = BOOKING;
