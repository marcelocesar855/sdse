const sgMail = require('@sendgrid/mail');
const { verify } = require('jsonwebtoken');
const nodemailer = require('nodemailer');

module.exports = {
    async sendEmail(to, subject, html) {

        const emailFrom = process.env.EMAIL_FROM;     
            var transporter = nodemailer.createTransport({
                host: process.env.EMAIL_SMPT_HOST,
                port: process.env.EMAIL_SMPT_PORT,
                secure: false, 
                tls: {
                    rejectUnauthorized: false
                },
                auth: {
                    user: process.env.EMAIL_SMPT_USERNAME,
                    pass: process.env.EMAIL_SMPT_PASSWORD
                }
            });

            const msgStmp = {
                from: emailFrom,
                to, 
                subject,
                html
            }

            return await transporter.sendMail(msgStmp, function (error, info) {
                if (error) {
                    return console.log("ERROR----" + error);
                }
                console.log('Message sent: ' + info.response);
            });
        }
     
    }
