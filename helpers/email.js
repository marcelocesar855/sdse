// Config APP
const sgMail = require('@sendgrid/mail');
const nodemailer = require('nodemailer');

module.exports = {
    async sendEmail(to, subject, html) {

        const emailFrom = process.env.EMAIL_FROM;      

        switch (process.env.EMAIL_DRIVER) {
            case 'smtp':
                let transporter = nodemailer.createTransport({
                    host: process.env.EMAIL_SMPT_HOST,
                    port: 587, 
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: process.env.EMAIL_SMPT_USERNAME,
                        pass: process.env.EMAIL_SMPT_PASSWORD
                    }
                });

                const msgStmp = {
                    from: `"Inkneedle" <${emailFrom}>`,
                    to, 
                    subject,
                    text: 'N/T',
                    html
                }

                return await transporter.sendMail(msgStmp);
            case 'sendgrid':
                sgMail.setApiKey(process.env.EMAIL_SENDGRID_API_KEY);
                
                const msgSendgrid = {
                    to,
                    from: emailFrom,
                    subject,
                    text: 'N/T',
                    html
                };

                return await sgMail.send(msgSendgrid);
            default:
                return;
        }
     
    }
}