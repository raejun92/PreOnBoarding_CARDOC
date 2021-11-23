import express from ('express');
import path from ('path');
import cookieParser from ('cookie-parser');
import morgan from ('morgan');

// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

const indexRouter = require('./routes/index');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); 

app.use('/', indexRouter);

module.exports = app;
