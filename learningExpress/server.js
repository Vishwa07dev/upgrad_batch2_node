/**
 * We are going to create an express server 
 * ( which is internally a http server only)
 */
const express = require('express');

console.log(typeof express);

const app = express();
console.log(typeof app);

app.get("/hello", (req, res)=>{
    res.status(200).send({
        message : "hello Students"
    });
})

app.put("/", (req, res)=>{
    res.status(200).send("Replying to PUT Call");
})


app.post("/", (req, res)=>{
    res.status(201).send("Replying to POST Call");
})

app.delete("/", (req, res)=>{
    res.status(201).send("Replying to DELETE Call");
})



/**
 * Start the server
 * 
 * port is appened to the process only once at the beginning
 */
app.listen(8000, ()=>{
   console.log("Server started");
});
