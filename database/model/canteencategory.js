const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CANTEENCATEGORY_Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  time: {
    type: String,
    required: true,
    trim: true,
  }
});

const CANTEENCATEGORY = mongoose.model("canteencategory", CANTEENCATEGORY_Schema);
module.exports = CANTEENCATEGORY;
