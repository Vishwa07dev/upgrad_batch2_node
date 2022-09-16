/**
 * This is the entry file of the application
 */

const mongoose = require("mongoose");
const Student = require("./models/student.model");
const Institute = require("./models/institute.model");


/**
 * Connect to the MongoDB
 *    1.  MongoDB URL
 */
mongoose.connect("mongodb://127.0.0.1/upgradbatch2db", ()=>{
   console.log("Connected to MongoDB");
   dbOperations();

   //insert the students in the students collections
},err=>{
   console.log("Error, " , err.message);
});



 async function dbOperations(){
    /**
     * Promise way of handling
     */
   /** const student =  Student.create({
         name : "Vishwa",
         age : 99
     });

    student.then((s)=>{
        console.log(s)
    }); **/

   /**
    * Async Await
    */

   /** 
    const instituteCreated = await Institute.create({
        name : "XYZ",
        coursesCount : 10,
        seats : 4500
    });
    const student =  await Student.create({
        name : "Vishwa",
        age : 99,
        address : {
           lane1 : "24 cross",
           lane2 : "RJ Marg",
           street : "Bellandur",
           city : "Bangalore",
           country : "India",
           pinCode : 560049 
        },
        institute : instituteCreated._id,
        subjects : ["Maths"]
    });

   console.log(student);
   
   /**
    *   I want to get the list of all the existing students 
    */
   /** 
   const students = await Student.find();

   console.log(students) ;  **/

   // Search student based on the id
   const student = await Student.findOne({_id : "6320bfd7ed37d503accd1ad2"});

   console.log(student);

   // I want to update the record

   student.name = "Vishwa_Updated";
   student.subjects = ["Maths"];
   await student.save();

   const sameStudent = await Student.findOne({_id : "6320bfd7ed37d503accd1ad2"});
   console.log(sameStudent);


   // I want delete a document
   const deletedStudent  = await Student.deleteOne({_id : "6320bfd7ed37d503accd1ad2"});

   console.log(deletedStudent);

}