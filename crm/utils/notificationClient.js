

/**
 * using the node rest client we are going to 
 * send the POST call
 */

const Client = require("node-rest-client").Client ;

const client = new Client();


/**
 * Export a method which will have the logic
 *  to send the POST call
 */

module.exports = ( subject , content , recepientEmails , requester)=> {
    const reqBody = {
        subject : subject,
        content : content,
        recepientEmails : recepientEmails,
        requester : requester
    }
    const args = {
        data : reqBody,
        headers : {"Content-Type" :  "application/json"}
    };
    // TODO - URL should be not hardcoded.. It should come from config file
    client.post("http://127.0.0.1:8081/notificationserv/api/v1/notifications", args, (data, response)=>{
       console.log("Request sent");
       console.log(data);
       console.log(response);
    })

}