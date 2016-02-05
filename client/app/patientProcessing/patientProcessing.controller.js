'use strict';

angular.module('oxhnApp')
  .controller('PatientProcessingCtrl', function ($scope, $http, $timeout, Modal, Auth) {
     $scope.getCurrentUser = function(){
        try {
            return Auth.getCurrentUser().profile.name;
        }
        catch (err)
        {console.log(err)}
        return '';
    }
    $scope.categories = [
        ['New Patient', 'newPatientCompleted', 'newPatientScheduled'],
        ['1st Treatment', 'firstTreatmentCompleted', 'firstTreatmentScheduled'],
        ['Treatments', 'treatmentsCompleted', 'treatmentsScheduled'],
        ['ABI', 'abiCompleted', 'abiScheduled'],
        ['Biopsy', 'biopsyCompleted', 'biopsyScheduled'],
        ['No Shows', 'noShowsCompleted', 'noShowsScheduled'],
        ['Canceled', 'canceledCompleted', 'canceledScheduled']
    ];
    $scope.patientProcessingData = [];
    $scope.patientProcessingForm = {date: moment().utc(), user: $scope.getCurrentUser()};
    $scope.logs = [];
    $scope.getData = function(){
        $http.get('/api/patient-processings').then(
            function(response){
                $scope.logs = response.data;
            },
            function(error){
                console.log(error);
            }
        );
    }
   
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
    
    // Submit Data to the Database
    $scope.submit = function(){
        $scope.$broadcast('show-errors-check-validity'); // Some fields are not set, turn on the red light
        if ($scope.processingForm.$invalid) { return; }
        $scope.isVisible=false;
        $scope.successSwitch();  
        $http.post('/api/patient-processings/', $scope.patientProcessingForm).then( 
            function(response){
                $scope.$broadcast('show-errors-reset');
                $timeout(()=>{$scope.successSwitch($scope.isVisible=true);}, 2000);
                $scope.reset();  
            },
            function(error){
                console.log(error);
                alert("Something went wrong...");
            }
        );
    };
    
    // Reset the Form
    $scope.reset = function(){
        $scope.patientProcessingForm = $.extend({}, {date: new Date().toUTCString()});
    }
    
    // Delete Log
    $scope.remove = function(id) {
        $http.delete('/api/patient-processings/' + id).then(
            function(response){
                $scope.getData();
            },
            function(error){
                console.log(error);
            }
        );
    };
  });
