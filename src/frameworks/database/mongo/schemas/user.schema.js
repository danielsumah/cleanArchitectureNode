const mongoose = require("mongoose");
const {Schema, ObjectId} = mongoose;

module.exports= new Schema({
    id        : String,
    firstName : String,
    lastName  : String,
    gender    : Number,
    meta      : Object,
    createdAt : Date,
    updateAt  : Date
})
