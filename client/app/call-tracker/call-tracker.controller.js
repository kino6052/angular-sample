'use strict';

angular.module('oxhnApp')
  .controller('CallTrackerCtrl', function ($scope) {
    $scope.message = 'Hello';
    console.log("test");
    var _selected;
    $scope.selected = undefined;
    $scope.states = ["TV","Friend","Other"];
    // Any function returning a promise object can be used to load values asynchronously
    
    $scope.help = 'Change';  
    $scope.outcome = 'Scheduled';
    $scope.checkResults = [];
    

    $scope.save = function() {
        $scope.$broadcast('show-errors-check-validity');
        console.log({
        "firstName": "$scope.user.firstName"
        });
        if ($scope.userForm.$invalid) { return; }
        console.log({
        "firstName": $scope.user.firstName
        });
        // code to add the user
    };
    
    $scope.reset = function() {
        $scope.$broadcast('show-errors-reset');
        $scope.user = { name: '', email: '' };
        $scope.phoneVal = '';
    };
  });
