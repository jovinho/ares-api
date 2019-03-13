const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());

const datapaths = require('./datapath/datapath-routes');
const topology = require('./topology/topology-routes');
const event = require('./event/event-routes');

const db = require('./db.js');

//Middleware that will create connection to database
app.use(db.createConnectionMiddleware);

//ROUTING
app.use(datapaths);
app.use(topology);
app.use(event);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({ error: 'something went wrong' });
});

//Middleware that will close connection to databse
app.use(db.closeConnectionMiddleware);

module.exports = app;
