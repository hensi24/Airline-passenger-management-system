const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const USER_Schema = new Schema({
    image :{
        type : String,
        required : true,
        trim : true
    },
    name :{
        type : String,
        required : true,
        trim : true
    },
    mno : {
        type: Number,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true
    },
    password : {
        type : String,
        required : true,
        trim : true
    }
})

const USER = mongoose.model('user',USER_Schema)
module.exports= USER;