'use strict';

describe('Controller: CallTrackerCtrl', function () {

  // load the controller's module
  beforeEach(module('oxhnApp'));

  var CallTrackerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CallTrackerCtrl = $controller('CallTrackerCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
