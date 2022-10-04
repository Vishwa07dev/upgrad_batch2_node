/**
 * How we can send email
 * 
 * 
 * SMTP server
 * 
 * Industry |  Dedicated SMTP servers
 * 
 * 2 options : our own SMTP server | Google -> gmail.com
 * 
 * 
 * We are going to leverage gmail.com SMTP server to send emails
 * 
 * 
 * user : vish007dev@gmail.com
 * pass : vpphciilrvkzgmkq 
 */

const nodemailer = require("nodemailer");

module.exports = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
        user: "vish007dev@gmail.com",
        pass: "vpphciilrvkzgmkq"
    },
    secure: true
});
/** *
const mailData = {
    to : ["dyutimaydutta@gmail.com","kankvish@gmail.com", "23achinta@gmail.com","sntshkmr60@gmail.com"],
    subject : "Email from Vishwa",
    text : "Happy Saturday !!!"
}

transporter.sendMail(mailData, (err, data)=>{
    if(err){
        console.log(err);
    }else{
        console.log(data);
    }
})
**/

