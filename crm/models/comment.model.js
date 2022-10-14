const { compareSync } = require("bcryptjs");
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
   content : {
       type : String,
       required : true
   },
   ticketId : {
       tupe : mongoose.SchemaTypes.ObjectId,
       ref : "Ticket",
       required : true
   },
   commenterId : {
       type : String,
       required : true
   }
}, { timestamps : true , versionKey : false});


module.exports = mongoose.model("Comment", commentSchema);