'use strict';

angular.module('oxhnApp')
  .controller('CallTrackerCtrl', function ($scope, $http, $timeout, CallTracker, Modal, Auth) {
    // Calendar 
    $scope.users = [];
    $scope.role = 'user';
    $scope.getCurrentUser = function(){
        try {
            return Auth.getCurrentUser()._id;
        }
        catch (err)
        {return 0;}
        return 0;
        ;
    };
    $scope.getCurrentRole = function(){
        try {
            return Auth.getCurrentUser().role;
        }
        catch (err)
        {console.log(err)}
        return '';
    }
    $scope.userId = $scope.getCurrentUser();

    $scope.CallTracker = CallTracker;
    $scope.setFollowupDate = function(value){
        $scope.user.ocFollowUp = moment().add(parseInt(value), 'days').utc();
    }
    $scope.getFollowupDate = function(value){
        $scope.user.ocFollowUp = moment(value.toUTCString()).utc();
        console.log(value.toUTCString());
    }
    // Model 
    $scope.initiateUser = function(){
        $scope.user = $.extend({}, CallTracker.user);        
        $scope.user.callInitiated = moment().utc();
        $scope.user.user = $scope.userId;
    };
    $scope.initiateUser();

    // Resetting Forms
    $scope.$on('reset-call-type', function(){
    });
    $scope.$on('reset-outcome', function(){
    });
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
    $scope.failureSwitchState=false;
    $scope.failureSwitch=function(callback){
        $scope.failureSwitchState=!$scope.failureSwitchState;
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
    $scope.updateForm = function(section){
        switch (section) {
            case 'callType':
                $scope.user.referral = '';
                $scope.resetCallType();
                break;
            case 'outcome':
                $scope.resetOutcome();
                break;
            default:
                break;
        }  
    }
    
    
    $scope.resetCallType = function() {
        $scope.user.doctorName = '';
        $scope.user.newspaper = '';
        $scope.user.tv = '';
        $scope.user.location = '';
        $scope.user.patientName = '';
        $scope.user.referral = '';
        $scope.user.referralOther = '';
        $scope.resetOutcome();
    }
    
    $scope.resetOutcome = function() {
        $scope.user.followupDate = '';
        $scope.user.insurance = '';
        $scope.user.ocFollowUp = '2';
        $scope.user.outcome = 'Other';
        $scope.user.outcomeOther = '';
        $scope.user.referralRequired = false;
        $scope.user.location = '';
    }
    
    $scope.updateReferral = function(value){
        $scope.resetCallType();
        $scope.user.referral = value;
    }
    
    $scope.updateChannel = function(value){
        $scope.resetCallType();
        $scope.user.referral = 'TV';
        $scope.user.tv = value;
    }
    
    $scope.updateNewspaper = function(value){
        $scope.resetCallType();
        $scope.user.referral = 'Newspaper';
        $scope.user.newspaper = value;
    }
    
    $scope.updateLocation = function(value){
        $scope.user.location = value;
    }
    
    $scope.confirm = function(){
        $scope.$broadcast('show-errors-check-validity');
        
        if ($scope.userForm.$invalid) { return; }
        Modal.confirm.verify("Check the Information for Correctness")($scope.user, function(){
            $scope.save();
        })
    }
    
    // Save User
    $scope.save = function() {
        $scope.isVisible = false;
        $http.post('/api/call-tickets', $scope.user).then(
            function(data){
                $scope.successSwitch();
                $scope.initiateUser();
                $scope.$broadcast('show-errors-reset');
                $timeout(()=>{$scope.successSwitch(()=>{$scope.isVisible=true;})}, 2000);
            },
            function(error){
                $scope.failureSwitch();
                $timeout(()=>{$scope.failureSwitch(()=>{$scope.isVisible=true;})}, 2000);
            }
        );
    };
    
    // Get Data
    $scope.getData = function() {
        console.log($scope.getCurrentRole());
        
        if ($scope.getCurrentRole() === "admin"){
           $http.get('/api/call-tickets/regular/').then(
                function(response){
                    $scope.users = response.data;
                },
                function(error){
                    console.log(error);
                }
            ); 
        } else {
            $http.get('/api/call-tickets/filtered/' + $scope.getCurrentUser()).then(
                function(response){
                    $scope.users = response.data;
                },
                function(error){
                    console.log(error);
                }
            );
        }
    };
  });
