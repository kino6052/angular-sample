'use strict';

describe('Service: CallTracker', function () {
    var $scope;
    var $location;
    
    beforeEach(module('oxhnApp'));
    
    beforeEach(inject(function(_$controller_){
        $scope = {};
        _$controller_('CallTrackerCtrl', {$scope: $scope});
    }));
    it('should redirect to the query', function() {
        expect($scope.role).toBe('user');
    });
/*
  it('Should Return User Name', function () {
    //var currentUser = callTrackerCtrl.getCurrentUser();
    expect(1).toEqual(1);
  });
*/
});
