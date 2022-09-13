/**
 * This file should contain the schema of the Student entity
 */

const mongoose = require("mongoose");

//console.log(mongoose);
//console.log(typeof mongoose);


const addressSchema = new mongoose.Schema({
    lane1 : String,
    lane2 : String,
    street : String,
    city : String,
    country : String,
    pinCode : Number
})

/**
 * Create a very simple student schema
 */
const studentSchema = new mongoose.Schema({
   name : String,
   age : Number,
   address : addressSchema,
   institute : {
       type : mongoose.SchemaTypes.ObjectId,
       ref : "institute"
   }
},{versionKey: false});

/**
 * 1. I need to export this, so that it can used from anywhere
 * 2. I need register this schema to a collection
 */
module.exports = mongoose.model("Student", studentSchema);
