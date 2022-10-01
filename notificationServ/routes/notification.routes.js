const notificationController = require("../controllers/notification.controller")
const notificationValidator = require("../middlewares/verifyNotificationRequestBody")

module.exports = (app) => {
  app.post("/notificationserv/api/v1/notifications", [notificationValidator.validateNotificationRequestBody], notificationController.newNotification)
}
