const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(bodyParser.json())

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.mongodb.net/mission_db?retryWrites=true&w=majority`, 
).then(() => {
    console.log('Succes')
}).catch(err => console.log(err))

app.listen(process.env.PORT, function () {
    console.log('Demarrage du server sur le port : ' + process.env.PORT)
});