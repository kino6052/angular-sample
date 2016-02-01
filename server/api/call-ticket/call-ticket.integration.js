'use strict';

var app = require('../..');
import request from 'supertest';

var newCallTicket;

describe('CallTicket API:', function() {

  describe('GET /api/call-tickets', function() {
    var callTickets;

    beforeEach(function(done) {
      request(app)
        .get('/api/call-tickets')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          callTickets = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      callTickets.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/call-tickets', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/call-tickets')
        .send({
          name: 'New CallTicket',
          info: 'This is the brand new callTicket!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newCallTicket = res.body;
          done();
        });
    });

    it('should respond with the newly created callTicket', function() {
      newCallTicket.name.should.equal('New CallTicket');
      newCallTicket.info.should.equal('This is the brand new callTicket!!!');
    });

  });

  describe('GET /api/call-tickets/:id', function() {
    var callTicket;

    beforeEach(function(done) {
      request(app)
        .get('/api/call-tickets/' + newCallTicket._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          callTicket = res.body;
          done();
        });
    });

    afterEach(function() {
      callTicket = {};
    });

    it('should respond with the requested callTicket', function() {
      callTicket.name.should.equal('New CallTicket');
      callTicket.info.should.equal('This is the brand new callTicket!!!');
    });

  });

  describe('PUT /api/call-tickets/:id', function() {
    var updatedCallTicket;

    beforeEach(function(done) {
      request(app)
        .put('/api/call-tickets/' + newCallTicket._id)
        .send({
          name: 'Updated CallTicket',
          info: 'This is the updated callTicket!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCallTicket = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCallTicket = {};
    });

    it('should respond with the updated callTicket', function() {
      updatedCallTicket.name.should.equal('Updated CallTicket');
      updatedCallTicket.info.should.equal('This is the updated callTicket!!!');
    });

  });

  describe('DELETE /api/call-tickets/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/call-tickets/' + newCallTicket._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when callTicket does not exist', function(done) {
      request(app)
        .delete('/api/call-tickets/' + newCallTicket._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
