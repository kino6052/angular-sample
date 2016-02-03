'use strict';

angular.module('oxhnApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('patientProcessing', {
        url: '/patientProcessing',
        templateUrl: 'app/patientProcessing/patientProcessing.html',
        controller: 'PatientProcessingCtrl'
      });
  });
