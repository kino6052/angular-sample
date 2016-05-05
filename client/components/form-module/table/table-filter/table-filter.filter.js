'use strict'

angular.module('form.module').filter('tableFilter', function() {
  return function(input) {
    switch (input) {
        case 'New Patients':
            return 'glyphicon glyphicon-user';
        case '1st Treatment':
            return 'glyphicon glyphicon-leaf'
        case 'Treatments':
            return 'glyphicon glyphicon-check'
        case 'ABI':
            return 'glyphicon glyphicon-leaf'
        case 'Biopsy':
            return 'glyphicon glyphicon-search'
        case 'No Shows':
            return 'glyphicon glyphicon-eye-close'
        case 'Canceled':
            return 'glyphicon glyphicon-remove'
        default:
            break;
    }
    return input;
  };
});