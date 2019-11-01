var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registeredRouter = require('./routes/registered');
var libraryRouter = require('./routes/dictionary');

var app = express();

// this is our MongoDB database
const dbRoute = 'mongodb+srv://[user]:[password]@back-api-1uqs2.mongodb.net/Diwali?retryWrites=true&w=majority'

mongoose.connect(dbRoute, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

let db = mongoose.connection;

db.once('open', () => {
  console.log('connected to the database')
});

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/registered', registeredRouter);
app.use('/library', libraryRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (err.status === 404) {
    return res.send('<div style="text-align: center"><h1>No Page Found!</h1> Better Luck Next Time.....</div>');
  }
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
