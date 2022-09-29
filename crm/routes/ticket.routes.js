/**
 * routes for the ticket resource
 */
const ticketController = require("../controllers/ticket.controller");
const authJwt = require("../middlewares/authjwt");


module.exports = (app)=>{

   //route for creating the ticket
   app.post("/crm/api/v1/tickets/",[authJwt.verifyToken], ticketController.createTicket);

   //route for updating the ticket
   app.put("/crm/api/v1/tickets/:id",[authJwt.verifyToken], ticketController.updateTicket);
   

   //route for get all the ticket
   app.get("/crm/api/v1/tickets", [authJwt.verifyToken] , ticketController.getAllTickets);
   
   //route for getting ticket based on the id
   app.get("/crm/api/v1/tickets/:id", [authJwt.verifyToken] , ticketController.getOneTicket);


}