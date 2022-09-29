
const Ticket = require("../models/ticket.model");
const User = require("../models/user.model");
const constants = require("../utils/constants");

/**
 * Write a controller method to create the ticket
 */
exports.createTicket = async (req, res) => {

    //Need to read from the req body and create Ticket object
    const ticketObj = {
        title: req.body.title,
        ticketPriority: req.body.ticketPriority,
        description: req.body.description,
        status: req.body.status,
        reporter: req.userId // This has been set while decoding access token
    }

    //Assign an engineer if present

    /**
     * Enhance this :
     * Based on all the Engineers, pick the Engineer with
     * minimum numbers of tickets assigned.
     */

    const eng = await User.findOne({
        userType: constants.userTypes.engineer,
        userStatus: constants.userStatuses.approved
    });

    if (eng) {
        ticketObj.assignee = eng.userId;
    }

    //Save it

    const ticketCreated = await Ticket.create(ticketObj);

    //Return the response

    res.status(201).send(ticketCreated);

}


/**
 * Upate the ticket
 * 
 * Admin
 * Owner of the ticket should be allowed
 * Assigned Engineer should be allowed
 * 
 * This should be done in the layer of MW 
 * 
 * TODO | Write the code to do this validation 
 */

exports.updateTicket = async (req, res) => {

    //ticket id passed in the path param should have been validated in the MW
    //Fetch the ticket
    const ticket = await Ticket.findOne({ _id: req.params.id });

    //Update the ticket fetched based on the req body passed

    ticket.title = req.body.title != undefined ? req.body.title : ticket.title;
    ticket.ticketPriority = req.body.ticketPriority != undefined ? req.body.ticketPriority : ticket.ticketPriority;
    ticket.status = req.body.status != undefined ? req.body.status : ticket.status;
    ticket.description = req.body.description != undefined ? req.body.description : ticket.description;


    // Save the fetched ticket in the database
    const updatedTicket = await ticket.save();

    // Return the response
    res.status(200).send(updatedTicket);

}

/**
 * Get me all the tickets
 * 
 *   1. Admin -> Get All the tickets
 *   2. Engineer -> Get tickets created by me and tickets assigned to me
 *   3. Customers  -> Get tickets created by me  
 */

exports.getAllTickets = async (req, res) => {
    try {
        var tickets = [];
        let queryObj = {};
        if (req.userType == constants.userTypes.admin) {

        } else if (req.userType == constants.userTypes.engineer) {
            queryObj = { $or: [{ reporter: req.userId }, { assignee: req.userId }] };
        } else {
            queryObj = { reporter: req.userId };
        }

        const tickets = await Ticket.find(queryObj);

        return res.status(200).send(tickets);
    } catch (err) {
        console.log("Error while fetching tickets", err.message);
    }
}

/**
 * Get the ticket based on the id
 */
exports.getOneTicket = async (req, res) => {
    
    const ticket = await Ticket.findOne({_id: req.params.id});
    res.status(200).send(ticket);
}