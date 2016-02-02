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
    $scope.patientProcessingForm = {};
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
    $scope.submit = function(){
        //if ($scope.newPatientsCompleted.$invalid) { return; }
        //$scope.patientProcessingData.push($.extend({},$scope.patientProcessingForm));
        
        $http.post('/api/patient-processings/', $scope.patientProcessingForm).then( 
            function(response){
                console.log(response);
            },
            function(error){
                console.log(error);
            }
        )
    };
    // Delete Log
    $scope.remove = function(id) {
        $http.delete('/api/patient-processings/' + id).then(
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
