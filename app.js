const express = require('express');
const morgan = require('morgan');
const path = require("path");
const favicon = require('serve-favicon');
var app = express();
var bodyParser = require('body-parser')

/* Paths */
const VIEW_PATH = path.join(__dirname, "views");

/* Util */
app.use(morgan('dev'));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


/* Handle each route */
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

app.get('/', function(req, res) {
	res.sendFile(path.join(VIEW_PATH, "index.html"));
});

app.get('/test/', function(req, res) {

	res.send('Hello World!')
})

module.exports = app;