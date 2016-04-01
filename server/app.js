/// <reference path = "./_reference.ts"/>
"use strict";
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
// flash messages
var flash = require('connect-flash');
// import objects namespace
var objects = require('./objects/customerror');
var CustomError = objects.CustomError;
var myerror = new CustomError();
var routes = require('./routes/index');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// favicon for the document
app.use(favicon(path.join(__dirname, '../public', 'images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// Initialize Session
app.use(session({
    secret: 'someSecret',
    saveUninitialized: false,
    resave: true
}));
// Initialize Flash Messages
app.use(flash());
app.use(express.static(path.join(__dirname, '../public')));
// Route Definitions
app.use('/', routes);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var error = new CustomError('Not Found');
    error.status = 404;
    next(error);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (error, req, res, next) {
        res.status(error.status || 500);
        res.render('error', {
            message: error.message,
            error: error
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function (error, req, res, next) {
    res.status(error.status || 500);
    res.render('error', {
        message: error.message,
        error: {}
    });
});
module.exports = app;

//# sourceMappingURL=app.js.map
