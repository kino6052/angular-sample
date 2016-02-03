'use strict';

var app = require('../..');
import request from 'supertest';

var newPatientProcessingTemp;

describe('PatientProcessingTemp API:', function() {

  describe('GET /api/patient-processing-temps', function() {
    var patientProcessingTemps;

    beforeEach(function(done) {
      request(app)
        .get('/api/patient-processing-temps')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          patientProcessingTemps = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      patientProcessingTemps.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/patient-processing-temps', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/patient-processing-temps')
        .send({
          name: 'New PatientProcessingTemp',
          info: 'This is the brand new patientProcessingTemp!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newPatientProcessingTemp = res.body;
          done();
        });
    });

    it('should respond with the newly created patientProcessingTemp', function() {
      newPatientProcessingTemp.name.should.equal('New PatientProcessingTemp');
      newPatientProcessingTemp.info.should.equal('This is the brand new patientProcessingTemp!!!');
    });

  });

  describe('GET /api/patient-processing-temps/:id', function() {
    var patientProcessingTemp;

    beforeEach(function(done) {
      request(app)
        .get('/api/patient-processing-temps/' + newPatientProcessingTemp._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          patientProcessingTemp = res.body;
          done();
        });
    });

    afterEach(function() {
      patientProcessingTemp = {};
    });

    it('should respond with the requested patientProcessingTemp', function() {
      patientProcessingTemp.name.should.equal('New PatientProcessingTemp');
      patientProcessingTemp.info.should.equal('This is the brand new patientProcessingTemp!!!');
    });

  });

  describe('PUT /api/patient-processing-temps/:id', function() {
    var updatedPatientProcessingTemp;

    beforeEach(function(done) {
      request(app)
        .put('/api/patient-processing-temps/' + newPatientProcessingTemp._id)
        .send({
          name: 'Updated PatientProcessingTemp',
          info: 'This is the updated patientProcessingTemp!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedPatientProcessingTemp = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPatientProcessingTemp = {};
    });

    it('should respond with the updated patientProcessingTemp', function() {
      updatedPatientProcessingTemp.name.should.equal('Updated PatientProcessingTemp');
      updatedPatientProcessingTemp.info.should.equal('This is the updated patientProcessingTemp!!!');
    });

  });

  describe('DELETE /api/patient-processing-temps/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/patient-processing-temps/' + newPatientProcessingTemp._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when patientProcessingTemp does not exist', function(done) {
      request(app)
        .delete('/api/patient-processing-temps/' + newPatientProcessingTemp._id)
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
