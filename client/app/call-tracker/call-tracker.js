'use strict';

angular.module('oxhnApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('call-tracker', {
        url: '/call-tracker',
        templateUrl: 'app/call-tracker/call-tracker.html',
        controller: 'CallTrackerCtrl'
      });
  });
