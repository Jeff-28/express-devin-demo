'use strict'

/**
 * Module dependencies.
 */

var express = require('../..');
var logger = require('morgan');
var session = require('express-session');
var { RedisStore } = require('connect-redis');
var { createClient } = require('redis');

var app = express();

app.use(logger('dev'));

// Initialize Redis client
var redisClient = createClient();
redisClient.connect().catch(console.error);

// Initialize Redis store
var redisStore = new RedisStore({
  client: redisClient,
  prefix: 'sess:'
});

// Populates req.session
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'keyboard cat',
  store: redisStore
}));

app.get('/', function(req, res){
  var body = '';
  if (req.session.views) {
    ++req.session.views;
  } else {
    req.session.views = 1;
    body += '<p>First time visiting? view this page in several browsers :)</p>';
  }
  res.send(body + '<p>viewed <strong>' + req.session.views + '</strong> times.</p>');
});

app.listen(3000);
console.log('Express app started on port 3000');
