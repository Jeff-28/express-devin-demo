
var app = require('../../examples/downloads')
  , request = require('supertest')
  , utils = require('../support/utils')
  , rawRequest = utils.rawRequest;

describe('downloads', function(){
  describe('GET /', function(){
    it('should have a link to amazing.txt', function(done){
      request(app)
      .get('/')
      .expect(/href="\/files\/amazing.txt"/, done)
    })
  })

  describe('GET /files/notes/groceries.txt', function () {
    it('should have a download header', function (done) {
      request(app)
        .get('/files/notes/groceries.txt')
        .expect('Content-Disposition', 'attachment; filename="groceries.txt"')
        .expect(200, done)
    })
  })

  describe('GET /files/amazing.txt', function(){
    it('should have a download header', function(done){
      request(app)
      .get('/files/amazing.txt')
      .expect('Content-Disposition', 'attachment; filename="amazing.txt"')
      .expect(200, done)
    })
  })

  describe('GET /files/missing.txt', function(){
    it('should respond with 404', function(done){
      request(app)
      .get('/files/missing.txt')
      .expect(404, done)
    })
  })

  describe('GET /files/../index.js', function () {
    it('should respond with 403', function (done) {
      rawRequest(app, 'GET', '/files/../index.js', function (err, res) {
        if (err) return done(err)
        if (res.statusCode !== 403) {
          return done(new Error('expected 403 "Forbidden", got ' + res.statusCode))
        }
        done()
      })
    })
  })
})
