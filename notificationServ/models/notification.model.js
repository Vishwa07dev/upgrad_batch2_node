/**
 * This will be schema file for the notification model
 */
const mongoose = require("mongoose");


const notificationSchema = new mongoose.Schema({
    subject : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    recepientEmails : {
        type : [String],
        required : true
    },
    sentStatus : {
        type : String,
        required : true,
        default : "UN_SENT"  //TODO : Put the string literals in the constant file
    },
    requester : {
        type : String,
        required : true
    }
},{ timestamps: true, versionKey: false });


module.exports = mongoose.model("Notification" , notificationSchema);