'use strict';

describe('Directive: phone', function () {

  // load the directive's module
  beforeEach(module('form.module'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));
/*
  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<phone></phone>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the phone directive');
  }));
*/
});
