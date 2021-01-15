const sgMail = require('@sendgrid/mail');
const nodemailer = require('nodemailer');

module.exports = {
    async sendEmail(to, subject, html) {

        const emailFrom = process.env.EMAIL_FROM;     
            let transporter = nodemailer.createTransport({
                host: process.env.EMAIL_SMPT_HOST,
                port: process.env.EMAIL_SMPT_PORT, 
                secure: true, // true for 465, false for other ports
                auth: {
                    user: process.env.EMAIL_SMPT_USERNAME,
                    pass: process.env.EMAIL_SMPT_PASSWORD
                }
            });

            const msgStmp = {
                from: `"Sistema de Doação de Solo de Escavação – SDSE" <${emailFrom}>`,
                to, 
                subject,
                text: 'N/T',
                html
            }

            return await transporter.sendMail(msgStmp);
        }
     
    }
