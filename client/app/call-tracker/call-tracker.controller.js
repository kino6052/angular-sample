'use strict';

angular.module('oxhnApp')
  .controller('CallTrackerCtrl', function ($scope, $http, $timeout, Modal, Auth) {
    console.log(JSON.parse(Auth.getCurrentUser().google));
    $scope.users = [];
    $scope.getCurrentUser = function(){
        try {
            return Auth.getCurrentUser().profile.name;
        }
        catch (err)
        {console.log(err)}
        return '';
    }
    
    // Model
    $scope.user = {
        callType: 'Change',
        outcome: 'Scheduled',
        textarea: '',
        callInitiated: moment().utc(),
        ocFollowUp: '2',
        referal: 'TV',
        user: $scope.getCurrentUser()
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
    
    // Dropdowns
    $scope.resetReferals = function() {
        $scope.user.tv = '';
        $scope.user.newspaper = '';
        $scope.user.doctorName = '';
        $scope.user.patientName = '';
    }
    
    $scope.updateReferal = function(value){
        $scope.resetReferals();
        $scope.user.referal = value;
    }
    
    $scope.updateChannel = function(value){
        $scope.resetReferals();
        $scope.user.tv = value;
    }
    
    $scope.updateNewspaper = function(value){
        $scope.resetReferals();
        $scope.user.newspaper = value;
    }
    
    // Save User
    $scope.save = function() {
        $scope.$broadcast('show-errors-check-validity');
        if ($scope.userForm.$invalid) { return; }
        $scope.isVisible = false;
        $scope.successSwitch();
        if ($scope.user.ocFollowUp && $scope.user.outcome==="Followup"){
            $scope.user.ocFollowUp = moment().add(Number($scope.user.ocFollowUp), 'days').utc()   
        }
        else {
            try {
                delete $scope.user.ocFollowUp;
            } catch(error) {
                console.log(error);
            }
        }
        $http.post('/api/call-tickets', $scope.user).then(
            function(data){
                console.log(data);
                $scope.user = {
                    callType: 'Change',
                    outcome: 'Scheduled',
                    textarea: '',
                    callInitiated: moment().utc(),
                    ocFollowUp: '2',
                    user: $scope.getCurrentUser()
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
        $http.get('/api/call-tickets/filtered/' + Auth.getCurrentUser().name).then(
            function(response){
                $scope.users = response.data;
            },
            function(error){
                console.log(error);
            }
        );
    };
  });
