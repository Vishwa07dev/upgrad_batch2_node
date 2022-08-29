//Initialization of the dependencies
const express = require('express');
let app = express();




/**
 * Datastore for the students
 */
let students = [{
    name: "Achinta",
    id: 101,
    age: 31,
    subjects: ["Science", "Maths", "English"]
}];

/**
 * inbuilt express middleware to conver JSON request body to JS object
 */
app.use(express.json());



/**
 * Custom middleware to validate the student request body
 */
const validateStudent = (req, res, next) => {
    const studentbody = req.body;


    if(!studentbody.hasOwnProperty('name')){
        return res.status(400).send({
            message : "Student name is not passed"
        });
    }

    if(!studentbody.hasOwnProperty('age')){
        return res.status(400).send({
            message : "Student age is not passed"
        });
    }

    if(!studentbody.hasOwnProperty('subjects')){
        return res.status(400).send({
            message : "Student subjects is not passed"
        });
    }

    if(!studentbody.hasOwnProperty('id')){
        return res.status(400).send({
            message : "Student id is not passed"
        });
    }
    /**
     * If everything is all good, pass the control to handler
     */
    next();
}


app.get('/ssa/v1/students', (req, res) => {
    res.status(200).json(students);
});

app.post('/ssa/v1/students', [validateStudent], (req, res) => {
    students.push(req.body)
    res.status(200).json(students);
});



/**
 * Starting of the server
 */
const _PORT = 8000;
app.listen(_PORT, () => {
    console.log("Server started at port: ", _PORT);
})