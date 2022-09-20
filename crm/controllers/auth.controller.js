/**
 * This is user controller file,
 * which will have the logic to register and login user
 */
const constants = require('../utils/constants');
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

/**
 * Write the logic to register a user
 * 
 */

exports.signup = async (req, res) => {

    /**
     * I will have to read the user signup request body
     */
    const userObj = {
        name: req.body.name,
        userId: req.body.userId,
        email: req.body.email,
        userType: req.body.userType,
        userStatus: (req.body.userType == constants.userTypes.engineer)
            ? constants.userStatuses.pending : req.body.userStatus,
        password: bcrypt.hashSync(req.body.password, 8)
    }

    try {
        /**
         * I will have to store that in DB
         */
        const user = await User.create(userObj);
        /**
         * I will have to return back the response
         */
        const userResp ={
           name : user.name,
           userId : user.userId,
           email : user.email,
           userType : user.userType,
           userStatus : user.userStatus,
           createdAt : user.createdAt,
           updatedAt : user.updatedAt
        }
     
        res.status(201).send(userResp);
    } catch (err) {
        console.log("Error while creating new user ", err.message);
        res.status(500).send({
            message: "Some internal error happened while inseting new user"
        })
    }
}