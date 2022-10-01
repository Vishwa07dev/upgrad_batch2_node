/**
 * This will be schema file for the notification model
 */
const mongoose = require("mongoose");
const constants = require("../utils/constants")


const notificationSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  recepientEmails: {
    type: [String],
    required: true
  },
  sentStatus: {
    type: String,
    required: true,
    default: constants.sentStatusTypes.unsent,
    enum: [constants.sentStatusTypes.unsent, constants.sentStatusTypes.sent]
  },
  requester: {
    type: String,
    required: true
  }
}, { timestamps: true, versionKey: false });


module.exports = mongoose.model("Notification", notificationSchema);
