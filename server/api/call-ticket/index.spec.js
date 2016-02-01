'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var callTicketCtrlStub = {
  index: 'callTicketCtrl.index',
  show: 'callTicketCtrl.show',
  create: 'callTicketCtrl.create',
  update: 'callTicketCtrl.update',
  destroy: 'callTicketCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var callTicketIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './call-ticket.controller': callTicketCtrlStub
});

describe('CallTicket API Router:', function() {

  it('should return an express router instance', function() {
    callTicketIndex.should.equal(routerStub);
  });

  describe('GET /api/call-tickets', function() {

    it('should route to callTicket.controller.index', function() {
      routerStub.get
        .withArgs('/', 'callTicketCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/call-tickets/:id', function() {

    it('should route to callTicket.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'callTicketCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/call-tickets', function() {

    it('should route to callTicket.controller.create', function() {
      routerStub.post
        .withArgs('/', 'callTicketCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/call-tickets/:id', function() {

    it('should route to callTicket.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'callTicketCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/call-tickets/:id', function() {

    it('should route to callTicket.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'callTicketCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/call-tickets/:id', function() {

    it('should route to callTicket.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'callTicketCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
