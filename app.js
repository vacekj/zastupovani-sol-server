const createError = require('http-errors');
const express = require('express');
const Sentry = require('@sentry/node');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

const app = express();

Sentry.init({ dsn: 'https://ef8151df2c86434aadc2fab354f21ae3@sentry.io/1724676' });

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

require("dotenv")
	.config();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

app.get('/debug-sentry', function mainHandler(req, res) {
	throw new Error('My first Sentry error!');
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.text(err.message);
});


module.exports = app;
