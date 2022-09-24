const User = require("../models/user.model");

/**
 * Find all users details - This shoudl be allowed only for the admin
 */
exports.findAllUsers = async (req, res) => {

    // Fetch the data from the DB
    try {
        const users = await User.find();

        if (!users) {
            return res.status(400).send({
                message: "No records found"
            })
        }

        // Remove the private data in these documents

        //TODO : BUG - Password is not getting removed. Fix this !!!

        const result  = users.map(user => delete user.password)

        console.log(users);
        console.log(result);

        // Return all the users
        res.status(200).send(users);
    } catch (err) {
        console.log("Error while fetching all the users ", err.message);
    }

}


/**
 * Find a User based on the userId
 */


/**
 * Update a user
 * 
 * TODO :
 * 
 * As a ADMIN user, I should be able to update the status of the user
 * 
 * Time till 11:25 PM 
 */