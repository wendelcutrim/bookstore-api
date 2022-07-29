var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
const BooksRoutes = require('./routes/booksV1');
const AuthRoutes = require('./routes/auth');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/bookstore', AuthRoutes)
app.use('/bookstore/api/v1', BooksRoutes);


module.exports = app;
