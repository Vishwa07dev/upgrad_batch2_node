

/**
 * Verify the user sign request body
 */
validateSignUpRequestBody = (req, res, next) => {

   //Validating name
   if(!req.body.name){
       return res.status(400).send({
           message : "user name is not provided"
       });
   }

   /**
    * TODO: Add the validations for the other fields as an assignment
    */
   next();


}

module.exports = {
    validateSignUpRequestBody : validateSignUpRequestBody
}