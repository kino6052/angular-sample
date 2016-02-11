'use strict';

describe('Service: CallTracker', function () {

  // load the controller's module
  beforeEach(module('oxhnApp'));

  var CallTrackerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, callTracker) {
    scope = $rootScope.$new();
    CallTrackerCtrl = $controller('CallTrackerCtrl', {
      $scope: scope
    });
  }));
/*
  it('Should Return User Name', function () {
    //var currentUser = callTrackerCtrl.getCurrentUser();
    expect(1).toEqual(1);
  });
*/
});
