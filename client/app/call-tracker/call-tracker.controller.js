'use strict';

angular.module('oxhnApp')
  .controller('CallTrackerCtrl', function ($scope, $http) {
    $scope.users = [];
    // Model
    $scope.user = {
        callType: 'Change',
        outcome: 'Scheduled',
        textarea: '',
        callInitiated: new Date().toUTCString()
    };
    
    var followupDate = new Date();
    
    // Save User
    $scope.save = function() {
        $scope.$broadcast('show-errors-check-validity');
        if ($scope.userForm.$invalid) { return; }
        if ($scope.user.ocFollowUp){
            followupDate.setDate(followupDate.getUTCDay() + $scope.user.ocFollowUp);
            $scope.user.ocFollowUp = followupDate.toUTCString();
            console.log()
        }
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
    
    // Delete User
    $scope.remove = function(id) {
        $http.delete('/api/call-tickets/' + id).then(
            function(response){
                console.log(response);
                $scope.getData();
            },
            function(error){
                console.log(error);
            }
        );
    };
  });
