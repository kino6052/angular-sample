'use strict';

describe('Service: webService', function () {

  // load the service's module
  beforeEach(module('oxhnApp'));

  // instantiate service
  var webService;
  beforeEach(inject(function (_webService_) {
    webService = _webService_;
  }));

  it('should do something', function () {
    expect(!!webService).toBe(true);
  });

});
