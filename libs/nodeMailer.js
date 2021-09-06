const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const { loggerError, loggerConsole } = require('./loggerWinston');

dotenv.config()

function sendMailEthereal(mailOptions) {

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'laverna.schmitt@ethereal.email',
            pass: 'ZEBUcQbHm9cK5Et47g'
        }
    });

    console.log(mailOptions);
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err)
            return err
        }
        console.log(info)
    });
}

function sendMailGmailSignup(mailOptions) {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USERGMAIL,
            pass: process.env.PASSGMAIL
        }
    });

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            loggerError.log("error", err)
            return err
        }
        loggerConsole.log("debug", info)
    });
}

module.exports = { sendMailEthereal, sendMailGmailSignup };
