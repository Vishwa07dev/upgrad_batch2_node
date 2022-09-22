/**
 * This is user controller file,
 * which will have the logic to register and login user
 */
const constants = require('../utils/constants');
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const authSecret = require("../configs/auth.config");

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


/**
 * Controller for signin
 * 
 * In the case of successfull login, it should go and
 * return access token
 */

exports.signin = async (req, res) =>{

    /**
     * Read the request body
     */


    /**
     * Load the user and check if the user is approved
     */
    const user = await User.findOne({userId : req.body.userId});

    if(!user){
        return res.status(400).send({
            message : "User id passed is incorrect, no user exists"
        })
    }

    if(user.userStatus != constants.userStatuses.approved){
        return res.status(400).send({
            message : "Can't allow the login as the user is in the pending state"
        })
    }
    /**
     * Verify if the password is correct
     */
    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

    if(!isPasswordValid){
        return res.status(400).send({
            "message" : "Password provided is incorrect"
        })
    }

    /**
     * Generate the token
     */

    const token = jwt.sign({id : user.userId},authSecret.secret, {
        expiresIn : 120
    });

    /**
     * Return the response
     */
    return res.status(200).send({
        name : user.name,
        userId : user.userId,
        email : user.email,
        userType : user.userType,
        userStatus : user.userStatus,
        accessToken : token
    })

};