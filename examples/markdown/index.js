'use strict'

/**
 * Module dependencies.
 */

var escapeHtml = require('escape-html');
var express = require('../..');
var fs = require('node:fs');
var path = require('node:path');

// marked 17.x is ESM-only, so we need to use dynamic import
var markedPromise = import('marked');

var app = module.exports = express();

// register .md as an engine in express view system

app.engine('md', function(path, options, fn){
  fs.readFile(path, 'utf8', function(err, str){
    if (err) return fn(err);
    markedPromise.then(function(marked) {
      var html = marked.parse(str).replace(/\{([^}]+)\}/g, function(_, name){
        return escapeHtml(options[name] || '');
      });
      fn(null, html);
    }).catch(fn);
  });
});

app.set('views', path.join(__dirname, 'views'));

// make it the default, so we don't need .md
app.set('view engine', 'md');

app.get('/', function(req, res){
  res.render('index', { title: 'Markdown Example' });
});

app.get('/fail', function(req, res){
  res.render('missing', { title: 'Markdown Example' });
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
