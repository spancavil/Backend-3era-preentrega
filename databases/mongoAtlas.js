const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');

const connection = mongoose.connect(process.env.MONGOCONN, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    console.log('[Mongoose] - connected in: cluster0.vchky.mongodb.net');
});

mongoose.connection.on('error', (err) => {
    console.log('[Mongoose] - error:', err);
});

module.exports = connection;