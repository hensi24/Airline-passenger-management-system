const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SERVICE_Schema = new Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
   description: {
    type: String,
    required: true,
    trim: true,
  },
});

const SERVICE = mongoose.model("service", SERVICE_Schema);
module.exports = SERVICE;
