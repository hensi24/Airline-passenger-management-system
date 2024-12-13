const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AIRLINESCLASS_Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  }
});

const AIRLINESCLASS = mongoose.model("airlinesclass", AIRLINESCLASS_Schema);
module.exports = AIRLINESCLASS;
