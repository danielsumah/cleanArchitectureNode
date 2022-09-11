const mongoose = require("mongoose");
const {Schema, ObjectId} = mongoose;
module.exports= new Schema({
    name            : String,
    description     : String,
    images          : Array,
    price           : Number,
    color           : String,
    meta            : Object,
    createdAt       : Date,
    updateAt        : Date
})