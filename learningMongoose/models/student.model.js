/**
 * This file should contain the schema of the Student entity
 */

const mongoose = require("mongoose");

//console.log(mongoose);
//console.log(typeof mongoose);


const addressSchema = new mongoose.Schema({
    lane1: String,
    lane2: String,
    street: String,
    city: String,
    country: String,
    pinCode: Number
})

/**
 * Create a very simple student schema
 */
const studentSchema = new mongoose.Schema({


    name: {
        type: String,
        required: true   // Constrain I put, that this field can't be empty
    },
    age: {
        type: Number,
        min: 16 // Constraint on the age
    },
    createdAt: {
        type: Date,
        default: () => {
            return Date.now();
        },
        immutable: true // Another constraint, which will make a field immutable
    },
    updatedAt: {
        type: Date,
        default: () => {
            return Date.now();
        }

    },
    /**
     * Custom constraints
     * Every student should learn atleast 1 subject
     * 
     * Custom validator
     */
    subjects : {
        type : [String],
        required : true,
        //Custom validator / constraint in the schema
        validate : {
            validator : s => s.length != 0 ,
            message : msg => "No subject is provided"

        }

    },
    address: addressSchema,
    institute: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "institute"
    }
}, { versionKey: false });

/**
 * 1. I need to export this, so that it can used from anywhere
 * 2. I need register this schema to a collection
 */
module.exports = mongoose.model("Student", studentSchema);
