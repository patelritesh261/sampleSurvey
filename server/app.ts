/// <reference path = "./_reference.ts"/>

import express = require('express');
import path = require('path');
var favicon = require('serve-favicon');
import logger = require('morgan');
import cookieParser = require('cookie-parser');
import bodyParser = require('body-parser');



import session = require('express-session');
// flash messages
import flash = require('connect-flash');


// import objects namespace
import * as objects from './objects/customerror';
import CustomError = objects.CustomError;
var myerror = new CustomError();

var routes = require('./routes/index');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// favicon for the document
app.use(favicon(path.join(__dirname, '../public','images' ,'favicon.ico')));
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
app.use((req: express.Request, res: express.Response, next: any) => {
    var error = new CustomError('Not Found');
    error.status = 404;
    next(error);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((error: CustomError, req: express.Request, res: express.Response, next: any) => {
        res.status(error.status || 500);
        res.render('error', {
            message: error.message,
            error: error
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((error: CustomError, req: express.Request, res: express.Response, next: any) => {
    res.status(error.status || 500);
    res.render('error', {
        message: error.message,
        error: {}
    });
});


module.exports = app;
