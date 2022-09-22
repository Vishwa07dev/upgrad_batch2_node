/**
 * Verify the user sign request body
 */
 const User = require("../models/user.model");
 const constants = require("../utils/constants");
  
 validateSignUpRequestBody = async (req, res, next) => {
     // Validating name 
     if (!req.body.name) {
         return res.status(400).send({
             message: "user name is not provided",
         });
     }
     //Validating userId
     if (!req.body.userId) {
         return res.status(400).send({
             message: "userId is not provided",
         });
     }
     //Validating email
     if (!req.body.email) {
         return res.status(400).send({
             message: "email is not provided",
         });
     }
     //Validating password
       if (!req.body.password) {
         return res.status(500).send({
             message: "Password not provided"
         });
     }
     //Validating userType
     if (!req.body.userType) {
         return res.status(500).send({
             message: "User type is not provided"
         });
     }
     //Validating userStatus
     if (!req.body.userStatus) {
         return res.status(500).send({
             message: "User status is not provided"
         });
     }
  
     //Check if userId already exists
     try {
         const user = await User.findOne({ userId: req.body.userId });
  
         if (user != null) {
             return res.status(400).send({
                 message: "User Id already exists"
             })
         }
     } catch (err) {
         return res.status(500).send({
             message: "Internal server error during validation"
         })
     }
  
     //Check if email already exists
     try {
         const user = await User.findOne({ email: req.body.email });
  
         if (user != null) {
             return res.status(400).send({
                 message: "email already used"
             });
         }
     } catch (err) {
         return res.status(500).send({
             message: "Internal server error during validation"
         });
     }
  
     //Check userTypes 
     if(req.body.userType == constants.userTypes.admin) {
         return res.status(500).send({
             message : "Cannot register admin"
         })
     }
     if(!(user.body.userType == constants.userTypes.customer || user.body.userType == constants.userTypes.engineer)) {
         res.status(400).send({
             message : "user type can only be CUSTOMER or ENGINEER"
         })
     }
     
     //Check userStatus
         if(req.body.userType == constants.userTypes.customer) {
         res.status(200).send({
             message : "Your registration is approved"
         })
     }
  
     if(req.body.userType == constants.userTypes.engineer) {
         res.status(200).send({
             message : "Waiting for approval of admin"
         })
     }
  
     next();
     
 }
  
 module.exports = {
     validateSignUpRequestBody: validateSignUpRequestBody
 }