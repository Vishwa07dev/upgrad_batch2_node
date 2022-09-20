/**
 * This file will define the schema of user entity
 */

const mongoose = require('mongoose');

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
        default: "CUSTOMER",
        enum: ["CUSTOMER", "ADMIN", "ENGINEER"]
    },
    userStatus: {
        type: String,
        required: true,
        default: "APPROVED",
        enum: ["APPROVED", "PENDING", "REJECTED"]
    },
    /**createdAt : {
        type : Date,
        default : ()=>{
            return Date.now();
        },
        immutable : true

    }**/
}, { timestamps: true, versionKey: false });