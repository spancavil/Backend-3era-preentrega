const dotenv = require('dotenv');
const { loggerConsole, loggerError } = require('./loggerWinston');
dotenv.config()

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

function sendTwilioSignUp(data){
    client.messages
    .create({
        body: data.body,
        from: `whatsapp:${process.env.FROMWTP}`,
        to: `whatsapp:${process.env.DESTINATARIOADMINWTP}`
    })
    .then(message => loggerConsole.log("debug", message.sid))
    .catch(error => loggerError.log("error", error))  
    .done();
}

function sendTwilioConfirmation(textoCompra, phone){
    client.messages
    .create({
        body: textoCompra,
        from: `whatsapp:${process.env.FROMWTP}`,
        to: `whatsapp:${phone}`
    })
    .then(message => loggerConsole.log("debug", message.sid))
    .catch(error => loggerError.log("error", error))  
    .done();
}

function sendTwilioOrderToAdmin(textoCompra, buyerPhone, email, username, adminPhone){
    client.messages
    .create({
        body: `Nuevo pedido del user: ${username} con email: ${email} y teléfono: ${buyerPhone}\n.
        ${textoCompra}`,
        from: `whatsapp:${process.env.FROMWTP}`,
        to: `whatsapp:${adminPhone}`
    })
    .then(message => loggerConsole.log("debug", message.sid))
    .catch(error => loggerError.log("error", error))  
    .done();
}

module.exports = {sendTwilioSignUp, sendTwilioConfirmation, sendTwilioOrderToAdmin}