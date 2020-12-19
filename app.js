import usersRouter from './routes/usersRouter';
import conditionRouter from './routes/conditionsRouter';
import caseRouter from './routes/casesRouter';

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cases', caseRouter);
app.use('/conditions', conditionRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

// Set up mongoose connection
const devDbUri = 'mongodb://localhost:27017/doctor-case-label';
const mongoDB = process.env.MONGODB_URI || devDbUri;

mongoose.Promise = global.Promise;
mongoose.connect(mongoDB, { useCreateIndex: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
