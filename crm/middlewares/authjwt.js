/**
 * This middleware will have the logic to validate
 * the access token passed in the request header
 */
const jwt = require("jsonwebtoken");
const secretConfig = require("../configs/auth.config");
const User = require("../models/user.model");
const constants = require("../utils/constants");


verifyToken = (req, res, next) =>{

    //Read the token passed in the request header
     const token = req.headers["x-access-token"];

    // Validate token
    if(!token){
        return res.status(403).send({
            message : "No token provided !"
        })
    }

    jwt.verify(token, secretConfig.secret , (err, decoded)=>{
        if(err){
            return res.status(401).send({
                message : "UnAuthorized token"
            });
        }
        req.userId  = decoded.id ;  // I am setting the userId to req object so that it can be used later
        next();
    })


}

/**
 * This middlewares checks if the caller is ADMIN or not
 */
isAdmin = async (req, res , next) =>{

    const user = await User.findOne({userId : req.userId}) ;

    if(user && user.userType == constants.userTypes.admin){
        next();
    }else{
        return res.status(403).send({
            message : "Only ADMIN is allowed to make this call"
        })
    }
}

module.exports = {
    verifyToken : verifyToken,
    isAdmin  : isAdmin 
}