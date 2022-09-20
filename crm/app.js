/**
 * This file is going to be the starting point of the application
 */

const express = require("express");
const app = express();
const serverConfig = require("./configs/server.config");
const mongoose = require("mongoose");
const dbConfig = require("./configs/db.config");
const User = require("./models/user.model");
const constants = require("./utils/constants");
const bcrypt = require("bcryptjs");

/**
 * Register the MW to read the JSON request body
 */
app.use(express.json());

// app.use(bodyParser.json());

/**
 * Create a mongodb connection and create some dummy data
 * 
 * ADMIN user should be created from the backend
 */

mongoose.connect(dbConfig.DB_URL);

const db = mongoose.connection;

db.on('error', () => {
    console.log("Error while connecting to the db");
});
db.once("open", () => {
    console.log("Connected to the MongoDB");
    /**
     * Write the code to init the db
     */
    init();
})

async function init() {
    /**
     * I am going to create the ADMIN user
     */

    //First check if the admin user is already present

    try {
        const adminUser = await User.findOne({ userId: 'admin' });

        if (adminUser) {
            console.log("Admin user already exists");
            return;
        }
    } catch (err) {
        console.log("error while fetching user ", err.message);
    }
    try {
        const user = await User.create({
            name: "Vishwa",
            userId: "admin",
            email: "kankvish@gmail.com",
            userType: constants.userTypes.admin,
            password: bcrypt.hashSync("Welcome1", 8)
        })

        console.log(user);
    } catch (err) {
        console.log("Error while storing the user", err.message);
    }
}

/**
 * Plug in the routes
 */
require("./routes/auth.routes")(app);

/**
 * Start the server
 */
app.listen(serverConfig.PORT, () => {
    console.log(`Server started on the port no : ${serverConfig.PORT}`);
})