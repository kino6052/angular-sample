'use strict';

angular.module('oxhnApp')
  .controller('CallTrackerCtrl', function ($scope, $http) {
    $scope.users = [];
    // Model
    $scope.user = {
        callType: 'Change',
        outcome: 'Scheduled',
        textarea: ''
    };
    
    // Save User
    $scope.save = function() {
        $scope.$broadcast('show-errors-check-validity');
        if ($scope.userForm.$invalid) { return; }
        console.log('Control reached here');
        $http.post('/api/call-tickets', $scope.user).then(
            function(data){
                console.log(data);
            },
            function(error){
                console.log(error);
            }
        );
    };
    
    // Save User
    $scope.getData = function() {
        $http.get('/api/call-tickets').then(
            function(response){
                $scope.users = response.data;
            },
            function(error){
                console.log(error);
            }
        );
    };
  });
