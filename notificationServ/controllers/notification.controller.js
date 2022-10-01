const Notification = require("../models/notification.model")
const constants = require("../utils/constants")


exports.newNotification = async (req, res) => {
  const notificationObj = {
    subject: req.body.subject,
    content: req.body.content,
    recepientEmails: req.body.recepientEmails,
    sentStatus: constants.sentStatusTypes.unsent,
    requester: req.body.requester
  }

  // store ticket data to DB
  try {
    const notificationCreated = await Notification.create(notificationObj)

    // return response
    const notificationResp = {
      subject: notificationCreated.subject,
      content: notificationCreated.content,
      recepientEmails: notificationCreated.recepientEmails,
      sentStatus: notificationCreated.sentStatus,
      requester: notificationCreated.requester
    }
    res.status(201).json(notificationResp)

  } catch (error) {
    console.log("Error while creating a new notification", error.message);
    res.status(500).json({
      message: "Some internal server error has happened when inserting notification"
    })
  }
}
