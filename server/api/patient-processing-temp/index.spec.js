'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var patientProcessingTempCtrlStub = {
  index: 'patientProcessingTempCtrl.index',
  show: 'patientProcessingTempCtrl.show',
  create: 'patientProcessingTempCtrl.create',
  update: 'patientProcessingTempCtrl.update',
  destroy: 'patientProcessingTempCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var patientProcessingTempIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './patient-processing-temp.controller': patientProcessingTempCtrlStub
});

describe('PatientProcessingTemp API Router:', function() {

  it('should return an express router instance', function() {
    patientProcessingTempIndex.should.equal(routerStub);
  });

  describe('GET /api/patient-processing-temps', function() {

    it('should route to patientProcessingTemp.controller.index', function() {
      routerStub.get
        .withArgs('/', 'patientProcessingTempCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/patient-processing-temps/:id', function() {

    it('should route to patientProcessingTemp.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'patientProcessingTempCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/patient-processing-temps', function() {

    it('should route to patientProcessingTemp.controller.create', function() {
      routerStub.post
        .withArgs('/', 'patientProcessingTempCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/patient-processing-temps/:id', function() {

    it('should route to patientProcessingTemp.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'patientProcessingTempCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/patient-processing-temps/:id', function() {

    it('should route to patientProcessingTemp.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'patientProcessingTempCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/patient-processing-temps/:id', function() {

    it('should route to patientProcessingTemp.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'patientProcessingTempCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
