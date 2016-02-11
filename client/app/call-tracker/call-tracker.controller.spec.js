'use strict';
 
describe('CallTrackerCtrl', function() {
    beforeEach(module('oxhnApp'));
    var $controller;
    var user = {
        firstName: '',
        lastName: '',
        phone: '',
        callType: [  
            'New',
            'Change',
            'Cancel',
            'Billing',
            'Other'   
        ],
        outcome: [
            'Scheduled',
            'Followup',
            'Insurance',
            'Other'   
        ],
        callInitiated: moment().utc(),
        ocFollowUp: [
            '0', '2', '5', '7', '10'
        ],
        ocFollowUpCalendar: '',
        textarea: '',
        user: ''
    };

    beforeEach(inject(function(_$controller_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    describe('$scope.user Properties', function() {
        for (var key in CallTicket){
            if (user.hasOwnProperty(key)){
                it('Should Have Model with ' + key + ' Property and Default Value', function() {
                    var $scope = {};
                    var controller = $controller('CallTrackerCtrl', { $scope: $scope });
                    expect($scope.user.hasOwnProperty(key)).toBe(true);
                });
            }
        }
    });
    
    
    describe('$scope.user Default Value Fallback', function() {
        /*
            it('Should Set Scope ' + key + ' Property and Default Value', function() {
                var $scope = {};
                var controller = $controller('CallTrackerCtrl', { $scope: $scope });
                expect($scope.user.hasOwnProperty(key)).toBe(true);
            });
        */
    });
    
    describe('Reset the Model', function() {
        /*
            it('Should Set Scope ' + key + ' Property and Default Value', function() {
                var $scope = {};
                var controller = $controller('CallTrackerCtrl', { $scope: $scope });
                expect($scope.user.hasOwnProperty(key)).toBe(true);
            });
        */
    });
    
    describe('$scope.save()', function() {
        /*
            it('Should Set Scope ' + key + ' Property and Default Value', function() {
                var $scope = {};
                var controller = $controller('CallTrackerCtrl', { $scope: $scope });
                expect($scope.user.hasOwnProperty(key)).toBe(true);
            });
        */
    });
    
});
