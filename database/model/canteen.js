const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CANTEEN_Schema = new Schema({
  image: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  time: {
    type: String,
    required: true,
    trim: true,
  },
  foodname: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  }
});

const CANTEEN = mongoose.model("canteen", CANTEEN_Schema);
module.exports = CANTEEN;
