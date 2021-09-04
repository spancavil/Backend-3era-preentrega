const dotenv = require('dotenv');
dotenv.config()

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

console.log(accountSid, authToken)

function sendTwilioSignUp(data){
    console.log("HOLAA", data.body)
    client.messages
    .create({
        body: data.body,
        from: `whatsapp:${process.env.FROMWTP}`,
        to: `whatsapp:${process.env.DESTINATARIOWTP2}`
    })
    .then(message => console.log(message.sid))
    .catch(error => console.log(error))  
    .done();
}

module.exports = sendTwilioSignUp