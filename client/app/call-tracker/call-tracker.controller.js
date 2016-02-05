'use strict';

angular.module('oxhnApp')
  .controller('CallTrackerCtrl', function ($scope, $http, $timeout, Modal) {
    $scope.users = [];
    // Model
    $scope.user = {
        callType: 'Change',
        outcome: 'Scheduled',
        textarea: '',
        callInitiated: new Date().toUTCString()
    };
    
    var followupDate = new Date();
    
    // Form Properties
    $scope.isVisible=true;
    $scope.successSwitchState=false;
    $scope.successSwitch=function(callback){
        $scope.successSwitchState=!$scope.successSwitchState;
        try {
            callback();
        } catch (err) {
            console.log(err);
        }
    };
    
    $scope.click = function($event){
        angular.element(
            angular.element(
                angular.element($event.currentTarget).parent()
            ).children()[1]
        ).toggle('ng-show');
    }
    
    // Save User
    $scope.save = function() {
        $scope.$broadcast('show-errors-check-validity');
        if ($scope.userForm.$invalid) { return; }
        $scope.isVisible = false;
        $scope.successSwitch();
        if ($scope.user.ocFollowUp){
            followupDate.setDate(followupDate.getUTCDay() + $scope.user.ocFollowUp);
            $scope.user.ocFollowUp = followupDate.toUTCString();
            
        }
        $http.post('/api/call-tickets', $scope.user).then(
            function(data){
                console.log(data);
                $scope.user = {
                    callType: 'Change',
                    outcome: 'Scheduled',
                    textarea: '',
                    callInitiated: new Date().toUTCString()
                };
                $scope.$broadcast('show-errors-reset');
                $timeout(()=>{$scope.successSwitch(()=>{$scope.isVisible=true;})}, 2000);
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
  })
  .animation('.animate-show', function() {
  return {
    enter : function(element, done) {
      element.css('opacity',0);
      jQuery(element).animate({
        opacity: 1
      }, done);

      // optional onDone or onCancel callback
      // function to handle any post-animation
      // cleanup operations
      return function(isCancelled) {
        if(isCancelled) {
          jQuery(element).stop();
        }
      }
    },
    leave : function(element, done) {
      element.css('opacity', 1);
      jQuery(element).animate({
        opacity: 0
      }, done);

      // optional onDone or onCancel callback
      // function to handle any post-animation
      // cleanup operations
      return function(isCancelled) {
        if(isCancelled) {
          jQuery(element).stop();
        }
      }
    }
  }
  });
