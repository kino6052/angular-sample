'use strict';

describe('Controller: PatientProcessingCtrl', function () {

  // load the controller's module
  beforeEach(module('oxhnApp'));

  var PatientProcessingCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PatientProcessingCtrl = $controller('PatientProcessingCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
