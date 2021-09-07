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
            loggerError.log('error', err)
            return err
        }
        loggerConsole.log('debug', info)
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

function sendGmailOrder(buyer, textoCompra, phone, email){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USERGMAIL,
            pass: process.env.PASSGMAIL
        }
    });

    const mailOptions = {
        from: 'The backend burger',
        to: process.env.ADMINEMAIL,
        subject: `Nuevo pedido entrante!`,
        html: `<h4 style="color: blue;">Nuevo pedido del username: ${buyer}, email: ${email}, teléfono: ${phone}.<br>
        ${textoCompra} <br>
        Fecha: ${new Date().toLocaleString()}</h4>`
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            loggerError.log("error", err)
            return err
        }
        loggerConsole.log("debug", info)
    });

}

module.exports = { sendMailEthereal, sendMailGmailSignup, sendGmailOrder};
