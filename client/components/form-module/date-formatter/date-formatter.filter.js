angular.module('form.module').filter('dateFilter', function() {
  return function(input) {
    return input?moment.utc(input).subtract(7, 'hours').format('MMMM Do YYYY, h:mm:ss a'):'';
  };
});