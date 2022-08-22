

/**
 * We are going to create a http server in node.js
 * 
 * We need the module 'http'
 */
const http = require("http");


/**
 * Whenver we hit  127.0.0.1:3000
 */
const server = http.createServer((req, res)=>{
    //Logi
    if(req.url == "/hello"){
        res.end("Hello Students");
    }else if ( req.url == "/welcome"){
        res.end("Welcome students");
    }
    else{
        res.end("This is a random URL");
    }


});


server.listen(3000, ()=>{
    console.log('Sever started');
})