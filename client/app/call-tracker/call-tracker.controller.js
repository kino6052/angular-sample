'use strict';

angular.module('oxhnApp')
  .controller('CallTrackerCtrl', function ($scope, $http, $timeout, CallTracker, Auth) {
    // Calendar 
    $scope.users = [];
    $scope.role = 'user';
    $scope.getCurrentUser = function(){
        try {
            return Auth.getCurrentUser()._id;
        }
        catch (err)
        {console.log(err)}
        return '';
    };
    $scope.getCurrentRole = function(){
        try {
            return Auth.getCurrentUser().role;
        }
        catch (err)
        {console.log(err)}
        return '';
    }


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
        var user = CallTracker.user;
        user.user = $scope.getCurrentUser();
        user.callInitiated = moment().utc();
        $scope.user = user;
    };
    $scope.initiateUser();
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
    $scope.updateForm = function(section){
        switch (section) {
            case 'callType':
                $scope.user.referral = '';
                $scope.resetReferrals();
                break;
            case 'outcome':
                $scope.resetOutcome();
                break;
            default:
                break;
        }
        
    }
    
    $scope.resetReferrals = function() {
        $scope.user.tv = '';
        $scope.user.newspaper = '';
        $scope.user.doctorName = '';
        $scope.user.patientName = '';
        $scope.user.referralOther = '';
    }
    
    $scope.resetOutcome = function() {
        $scope.user.referralRequired = '';
        $scope.user.ocFollowUp = '';
        $scope.user.insurance = '';
        $scope.user.outcomeOther = '';
    }
    
    $scope.updateReferral = function(value){
        $scope.resetReferrals();
        $scope.user.referral = value;
    }
    
    $scope.updateChannel = function(value){
        $scope.resetReferrals();
        $scope.user.tv = value;
    }
    
    $scope.updateNewspaper = function(value){
        $scope.resetReferrals();
        $scope.user.newspaper = value;
    }
    
    // Save User
    $scope.save = function() {
        $scope.$broadcast('show-errors-check-validity');
        if ($scope.userForm.$invalid) { return; }
        $scope.isVisible = false;
        
        if ($scope.user.ocFollowUp && $scope.user.outcome==="Followup"){
            $scope.user.ocFollowUp = moment().add(Number($scope.user.ocFollowUp), 'days').utc();   
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
                $scope.successSwitch();
                $scope.initiateUser();
                $scope.$broadcast('show-errors-reset');
                $timeout(()=>{$scope.successSwitch(()=>{$scope.isVisible=true;})}, 2000);
            },
            function(error){
                alert("Something Went Wrong...")
                $scope.isVisible=true;
            }
        );
    };
    
    // Save User
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
