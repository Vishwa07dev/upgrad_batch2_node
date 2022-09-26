const mongoose = require("mongoose");
const constants = require("../utils/constants");

const ticketSchema = new mongoose.Schema({
   
    title : {
        type : String,
        required : true
    },
    ticketPriority : {
        type : Number,
        required : true,
        default : 4
    },
    description : {
       type : String,
       required  : true
    },
    status : {
        type : String,
        required : true,
        default : constants.ticketStatuses.open,
        enum : [constants.ticketStatuses.open, constants.ticketStatuses.completed, constants.ticketStatuses.in_progress , constants.ticketStatuses.blocked]
    },
    reporter : {
        type : String
    },
    assignee : {
        type : String
    }
}, { timestamps: true, versionKey: false });

module.exports  = mongoose.model("Ticket", ticketSchema);
