/**
 * Start a http server
 * Using this HTTP server we are going to expose the REST 
 * endpoints
 */

const express = require("express");
const app = express();

let id = 3;

const movies = {

    1: {
        id: 1,
        name: "Sholey",
        status: "Released",
        actor: "Amitabh and more ..."
    },
    2: {
        id: 2,
        name: "Tanu Weds Manu",
        status: "Released",
        actor: "Kanganna and more  ..."
    }
};


/**
 * Expose a REST endpoint to get the list of all the movies
 * 
 * asssuming this to be a movie booking application (mba)
 * 
 * GET 127.0.0.1:7777/mba/v1/movies/
 * 
 * Return the list of movies present in the system
 */

app.get("/mba/v1/movies", (req, res) => {

    console.log("Param object ", req.params);
    /**
     * Handler of the GET request
     * 
     * req -> request object, and it will have the req related info
     * res -> response object, this will be created and sent by this app
     */
    res.status(200).send(movies);
});

/**
 * Support for below REST URI
 * 
 * GET http://127.0.0.1:7777/mba/v1/movies/1
 *
 */
app.get("/mba/v1/movies/:id", (req, res) => {
    
    console.log("Param object "  , req.params);
    const movieId = req.params.id;
    console.log("Path param" ,movieId);

    const movieDetails  = movies[movieId];

    if(movieDetails){
        res.status(200).send(movieDetails);
    }else{
        res.status(400).send({
            message : "movie id passed doesn't exist"
        })
    }

})

/**
 * I want expose a REST endpoint for the users to create a new movie
 * 
 * What will be the REST endpoint ?
 * POST 127.0.0.1:7777/mba/v1/movies
 * 
 * Request body should be passed
 */
app.use(express.json());
app.post("/mba/v1/movies", (req, res)=>{
   
   // I need to first read the request body

   const movieBody = req.body ; //I am not able to read the request body now
   movieBody.id = id++;

   /**
    * Appending new movie into the existing  movies object
    */
   movies[movieBody.id] = movieBody;

   res.status(201).send(movies);
   
});


/**
 * I want implement an API to update an existing movies
 * 
 * PUT 127.0.0.1:7777/mba/v1/movies/3
 * 
 * Request body
 */



/**
 * Code to start the server
 */
app.listen("7777", () => {
    console.log("Server started");
})