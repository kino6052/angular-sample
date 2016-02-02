'use strict';

angular.module('oxhnApp')
.config(function($urlRouterProvider, $locationProvider, $stateProvider) {
    $urlRouterProvider
      .otherwise('/');
    
    $locationProvider.html5Mode(true);
    
    $stateProvider
    .state('state1', {
      url: "/state1",
      templateUrl: "app/main/main.html"
    })
    .state('state1.list', {
      url: "/list",
      templateUrl: "app/call-tracker/call-tracker-partial.html",
      controller: function($scope) {
        $scope.items = ["A", "List", "Of", "Items"];
      }
    })
    ;
  });
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
