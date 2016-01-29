'use strict';

angular.module('oxhnApp.auth', [
  'oxhnApp.constants',
  'oxhnApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
