/**
 * This file will contain the routes information for
 * auth
 */

const authController = require("../controllers/auth.controller");
const signUpValidator = require("../middlewares/verifyUserRequestBody");

module.exports = (app) => {
    app.post("/crm/api/v1/auth/signup",[signUpValidator.validateSignUpRequestBody],authController.signup);
    app.post("/crm/api/v1/auth/signin",authController.signin);
}