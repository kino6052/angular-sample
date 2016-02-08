'use strict';

angular.module('oxhnApp')
.config(function($urlRouterProvider, $locationProvider, $stateProvider) {
    // Routes
    $urlRouterProvider
      .otherwise('/');
    
    $locationProvider.html5Mode(true);
    
    $stateProvider
    .state('tracker', {
      url: "/tracker",
      templateUrl: "app/call-tracker/partials/call-tracker.html",
      controller: "CallTrackerCtrl",
      authenticate: 'user'
    })
    .state('call-log', {
      url: "/call-log",
      templateUrl: "app/call-tracker/partials/call-log.html",
      controller: "CallTrackerCtrl",
      authenticate: 'user'
    })
    ;
  });
