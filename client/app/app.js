'use strict';

angular.module('oxhnApp', [
  'oxhnApp.auth',
  'oxhnApp.admin',
  'oxhnApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'form.module'
])
  .config(function($urlRouterProvider, $locationProvider, $stateProvider) {
    
    // Routes
    $urlRouterProvider
      .otherwise('/');
    
    $locationProvider.html5Mode(true);
    
    $stateProvider
    .state('call', {
      url: "/call-tracker",
      templateUrl: "components/dashboard/dashboard.html",
      controller: "MainController"
    })
    .state('call.questionaire', {
      url: "/questionaire",
      templateUrl: "app/call-tracker/partials/call-tracker.html",
      controller: "CallTrackerCtrl"
    })
    .state('call.call-log', {
      url: "/call-log",
      templateUrl: "app/call-tracker/partials/call-log.html",
      controller: "CallTrackerCtrl"
    })
    ;
  });
