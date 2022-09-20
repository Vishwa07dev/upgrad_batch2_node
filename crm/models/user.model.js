/**
 * This file will define the schema of user entity
 */

const mongoose = require('mongoose');
const constants = require("../utils/constants")

//Create schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        minLength: 7,
        unique: true
    },
    userType: {
        type: String,
        required: true,
        default: constants.userTypes.customer,
        enum: [constants.userTypes.customer, constants.userTypes.admin, constants.userTypes.engineer]
    },
    userStatus: {
        type: String,
        required: true,
        default: constants.userStatuses.approved,
        enum: [constants.userStatuses.approved, constants.userStatuses.pending,constants.userStatuses.rejected ]
    },
    /**createdAt : {
        type : Date,
        default : ()=>{
            return Date.now();
        },
        immutable : true

    }**/
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model("User", userSchema);