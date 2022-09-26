

const userController = require("../controllers/user.controller");
const authjwt = require("../middlewares/authjwt");

module.exports = (app) => {

    app.get("/crm/api/v1/users",[authjwt.verifyToken, authjwt.isAdmin], userController.findAllUsers);
    // Add a MW to add the validation for the path param userId
    app.put("/crm/api/v1/users/:userId",[authjwt.verifyToken, authjwt.isAdmin], userController.update);
}