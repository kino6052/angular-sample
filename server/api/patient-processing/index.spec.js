'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var patientProcessingCtrlStub = {
  index: 'patientProcessingCtrl.index',
  show: 'patientProcessingCtrl.show',
  create: 'patientProcessingCtrl.create',
  update: 'patientProcessingCtrl.update',
  destroy: 'patientProcessingCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var patientProcessingIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './patient-processing.controller': patientProcessingCtrlStub
});

describe('PatientProcessing API Router:', function() {

  it('should return an express router instance', function() {
    patientProcessingIndex.should.equal(routerStub);
  });

  describe('GET /api/patient-processings', function() {

    it('should route to patientProcessing.controller.index', function() {
      routerStub.get
        .withArgs('/', 'patientProcessingCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/patient-processings/:id', function() {

    it('should route to patientProcessing.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'patientProcessingCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/patient-processings', function() {

    it('should route to patientProcessing.controller.create', function() {
      routerStub.post
        .withArgs('/', 'patientProcessingCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/patient-processings/:id', function() {

    it('should route to patientProcessing.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'patientProcessingCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/patient-processings/:id', function() {

    it('should route to patientProcessing.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'patientProcessingCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/patient-processings/:id', function() {

    it('should route to patientProcessing.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'patientProcessingCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
