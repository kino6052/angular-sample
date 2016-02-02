'use strict';

angular.module('oxhnApp')
  .controller('PatientProcessingCtrl', function ($scope) {
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
    $scope.submit = function(){
        if ($scope.newPatientsCompleted.$invalid) { return; }
        $scope.patientProcessingData.push($.extend({},$scope.patientProcessingForm));
    }
  });
