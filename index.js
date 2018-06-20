'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const cors = require('cors');
const mongoose = require('./schema/mongoose');
const api = require('./routes/api');
const app = express();
const path = require('path');

app.use(bodyParser.json())
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));


app.use('/api', api);

app.use('/public/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.use(express.static(path.join(__dirname, '/frontend/client/dist/home')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/client/dist/home/index.html'));
});

if (process.env.NODE_ENV === 'production') {
    app.use(function (req, res, next) {
        var protocol = req.get('x-forwarded-proto');
        protocol == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
    })
}
let port = process.env.PORT || config.PORT;
app.listen(port, function () {
    console.log(`Listening at port ${port}`);
}).on('error', function (error) {
    console.log(error);
});