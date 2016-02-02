'use strict';

var app = require('../..');
import request from 'supertest';

var newPatientProcessing;

describe('PatientProcessing API:', function() {

  describe('GET /api/patient-processings', function() {
    var patientProcessings;

    beforeEach(function(done) {
      request(app)
        .get('/api/patient-processings')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          patientProcessings = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      patientProcessings.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/patient-processings', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/patient-processings')
        .send({
          name: 'New PatientProcessing',
          info: 'This is the brand new patientProcessing!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newPatientProcessing = res.body;
          done();
        });
    });

    it('should respond with the newly created patientProcessing', function() {
      newPatientProcessing.name.should.equal('New PatientProcessing');
      newPatientProcessing.info.should.equal('This is the brand new patientProcessing!!!');
    });

  });

  describe('GET /api/patient-processings/:id', function() {
    var patientProcessing;

    beforeEach(function(done) {
      request(app)
        .get('/api/patient-processings/' + newPatientProcessing._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          patientProcessing = res.body;
          done();
        });
    });

    afterEach(function() {
      patientProcessing = {};
    });

    it('should respond with the requested patientProcessing', function() {
      patientProcessing.name.should.equal('New PatientProcessing');
      patientProcessing.info.should.equal('This is the brand new patientProcessing!!!');
    });

  });

  describe('PUT /api/patient-processings/:id', function() {
    var updatedPatientProcessing;

    beforeEach(function(done) {
      request(app)
        .put('/api/patient-processings/' + newPatientProcessing._id)
        .send({
          name: 'Updated PatientProcessing',
          info: 'This is the updated patientProcessing!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedPatientProcessing = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPatientProcessing = {};
    });

    it('should respond with the updated patientProcessing', function() {
      updatedPatientProcessing.name.should.equal('Updated PatientProcessing');
      updatedPatientProcessing.info.should.equal('This is the updated patientProcessing!!!');
    });

  });

  describe('DELETE /api/patient-processings/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/patient-processings/' + newPatientProcessing._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when patientProcessing does not exist', function(done) {
      request(app)
        .delete('/api/patient-processings/' + newPatientProcessing._id)
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
