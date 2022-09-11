const mongoose = require("mongoose");
const {Schema} = mongoose;

module.exports= new Schema({
    firstName : String,
    lastName  : String,
    gender    : Number,
    meta      : Object,
    createdAt : Date,
    updateAt  : Date
})
