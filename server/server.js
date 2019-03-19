let express = require('express');
let router = require('./routes/routes.js')
let path = require('path');
let bodyParser = require('body-parser');
let app = express();
let mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client'));
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

mongoose.connect('mongodb://localhost:27017/test');

app.use('/', router);

module.exports = app;