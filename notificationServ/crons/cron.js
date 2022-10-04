/**
 * Make use of node-cron to schedule the job 
 * 
 *    Duty of job :
 *      1. Fetch the notification documents from MongoDB, 
 *         which are in UN_SENT status
 *      2. Send emails for those notification request
 *      3. Change the status of those notification request to SENT
 *      
 */

const cron = require('node-cron');
const Notification = require("../models/notification.model");
const EmailTransporter = require("../notifier/emailService");

cron.schedule("*/20 * * * * *", async () => {

    console.log("Inside the cron");
    //Job for send the email notification
    const notifications = await Notification.find({
        sentStatus: "UNSENT"
    });

    console.log("No of notification pending", notifications.length);
    if (notifications && notifications.length > 0) {

        notifications.forEach(notification => {

            //Draft the email body
            const mailData = {
                to: notification.recepientEmails,
                subject: notification.subject,
                text: notification.content
            }
            console.log(mailData);
            EmailTransporter.sendMail(mailData, async (err, data) => {
                if (err) {
                    console.log("can't send email ", err.message);
                } else {
                    console.log(data);
                    //Need to update the notification status

                    notification.sentStatus = "SENT";
                    await notification.save();
                }
            })

        });

    }


})