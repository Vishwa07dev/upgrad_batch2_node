const mongoose = require("mongoose");

const instituteSchema = new mongoose.Schema({
    name : String,
    coursesCount : Number,
    seats : Number
 },{versionKey: false});

 module.exports = mongoose.model("institute", instituteSchema);
