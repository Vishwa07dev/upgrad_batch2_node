
const Ticket  = require("../models/ticket.model");
const User = require("../models/user.model");
const constants = require("../utils/constants");

/**
 * Write a controller method to create the ticket
 */
exports.createTicket = (req, res) =>{

   //Need to read from the req body and create Ticket object
   const ticketObj = {
      title = req.body.title,
      ticketPriority = req.body.ticketPriority,
      description = req.body.description,
      status = req.body.status,
      reporter = req.userId // This has been set while decoding access token
   }

   //Assign an engineer if present

   /**
    * Enhance this :
    * Based on all the Engineers, pick the Engineer with
    * minimum numbers of tickets assigned.
    */

   const eng = await User.findOne({
       userType : constants.userTypes.engineer,
       userStatus : constants.userStatuses.approved
   });

   if(eng){
       ticketObj.assignee = end.userId ;
   }

   //Save it

   const ticketCreated  = await Ticket.create(ticketObj);

   //Return the response
   
   res.status(201).send(ticketCreated);

}