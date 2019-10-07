var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var addRouter = require("./routes/add");
var editRouter = require("./routes/edit");
var deleteRouter = require("./routes/delete");
var mongoose = require('mongoose')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/edit', editRouter);
app.use('/add', addRouter);
app.use('/delete', deleteRouter);
// app.use('/cf', usersRouter);
app.use('/upload', express.static('upload'));
var mongoose = require('mongoose');
// Build the connection string
var dbURI = 'mongodb://localhost:27017/product';
mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true });
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});
// var formData = require('./routes/form-data');
// app.use('/form_data', formData);

app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
