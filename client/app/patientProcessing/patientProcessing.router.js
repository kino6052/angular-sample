'use strict';

angular.module('oxhnApp')
.config(function($urlRouterProvider, $locationProvider, $stateProvider) {
    // Routes
    $urlRouterProvider
      .otherwise('/');
    
    $locationProvider.html5Mode(true);
    
    $stateProvider
    .state('patient-processing-form', {
      url: "/patient-processing-form",
      templateUrl: "app/patientProcessing/partials/patient-processing-form-partial.html",
      controller: "PatientProcessingCtrl"
    })
    .state('patient-processing-log', {
      url: "/patient-processing-log",
      templateUrl: "app/patientProcessing/partials/patient-processing-log-partial.html",
      controller: "PatientProcessingCtrl"
    })
    ;
  });
