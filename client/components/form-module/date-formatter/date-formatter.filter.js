angular.module('form.module').filter('dateFilter', function() {
  return function(input) {
    return input?moment.utc(input).format('MMMM Do YYYY, h:mm:ss a'):'';
  };
});