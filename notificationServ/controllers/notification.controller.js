const Notification = require("../models/notification.model")
const constants = require("../utils/constants")


exports.newNotification = async (req, res) => {
  console.log(typeof req.body.recepientEmails);

  const emails = [];

  for (let key in req.body.recepientEmails){
      console.log(req.body.recepientEmails[key]);
      emails.push(req.body.recepientEmails[key]);
  }
  console.log(emails);
  const notificationObj = {
    subject: req.body.subject,
    content: req.body.content,
    recepientEmails: emails,
    sentStatus: constants.sentStatusTypes.unsent,
    requester: req.body.requester
  }

  // store ticket data to DB
  try {
    const notificationCreated = await Notification.create(notificationObj)
    console.log("after creating ", notificationCreated);
    // return response
    const notificationResp = {
      trackingId : notificationCreated._id
    }
    return res.status(201).send(notificationResp)

  } catch (error) {
    console.log("Error while creating a new notification", error.message);
    res.status(500).json({
      message: "Some internal server error has happened when inserting notification"
    })
  }
}
