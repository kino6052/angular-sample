'use strict';

angular.module('oxhnApp')
  .directive('dashboard', function () {
    return {
      templateUrl: 'components/dashboard/dashboard.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
