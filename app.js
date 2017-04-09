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

app.post('/newEvent/', function(req, res) {
	console.log(req.body)

	console.log(res.body)
		// TODO: broad the newEvent to all clients
	res.send("new event created")
})

/* ERROR HANDLERS */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.send({
			status: err.status,
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.send({
		status: err.status,
		message: err.message,
		error: {}
	});
});


module.exports = app;