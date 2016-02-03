'use strict';

angular.module('oxhnApp')
  .controller('PatientProcessingCtrl', function ($scope, $http) {
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
    $scope.patientProcessingForm = {date: new Date().toUTCString()};
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
    
    // Submit Data to the Database
    $scope.submit = function(){
        if ($scope.processingForm.$invalid) { return; }   
        $http.post('/api/patient-processings/', $scope.patientProcessingForm).then( 
            function(response){
                alert("Successfully added to the Database!");
                $scope.reset();
            },
            function(error){
                console.log(error);
                alert("Something went wrong...");
            }
        )
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
