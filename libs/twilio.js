const dotenv = require('dotenv');
const { loggerConsole, loggerError } = require('./loggerWinston');
dotenv.config()

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

console.log(accountSid, authToken)

function sendTwilioSignUp(data){
    client.messages
    .create({
        body: data.body,
        from: `whatsapp:${process.env.FROMWTP}`,
        to: `whatsapp:${process.env.DESTINATARIOWTP2}`
    })
    .then(message => loggerConsole.log("debug", message.sid))
    .catch(error => loggerError.log("error", error))  
    .done();
}

module.exports = sendTwilioSignUp