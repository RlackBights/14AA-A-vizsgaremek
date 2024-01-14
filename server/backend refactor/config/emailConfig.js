const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
});

module.exports = transporter;