'use strict';

angular.module('form.module')
  .directive('checkbox', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
        model: '=',
        name: '='
    },
    link: function($scope, elem, attr, ctrl) {
        // find the text box element, which has the 'name' attribute
        var element   = elem;
        // convert the native text box element to an angular element
        var ngElement = angular.element(element);
        // get the name on the text box so we know the property to check
        $scope.toggle = function(){
            $scope.$broadcast('checkbox-toggle');
        },
        $scope.checkbox = "Change";
        $scope.$on('checkbox-toggle', function(){
            if  (ngElement.attr('name') === $scope.checkbox){
                ngElement.toggleClass('active');  
            } 
            else console.log(ngElement.attr('name'));
        });
    },
    template: "<label class='btn btn-success' ng-click='toggle()'><span ng-transclude></span></label>"
  };
});
