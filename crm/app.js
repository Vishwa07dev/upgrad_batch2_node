/**
 * This file is going to be the starting point of the application
 */

const express  = require("express");
const app = express();
const serverConfig = require("./configs/server.config");

/**
 * Start the server
 */
app.listen(serverConfig.PORT,()=>{
    console.log(`Server started on the port no : ${serverConfig.PORT}` );
})