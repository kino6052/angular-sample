'use strict';

angular.module('oxhnApp')
  .directive('showErrors', function() {
  return {
    restrict: 'A',
    require: '^form',
    link: function (scope, el, attrs, formCtrl) {
      // find the text box element, which has the 'name' attribute
      var inputEl   = el[0].querySelector("[name]");
      // convert the native text box element to an angular element
      var inputNgEl = angular.element(inputEl);
      // get the name on the text box so we know the property to check
      // on the form controller
      var inputName = inputNgEl.attr('name');
      
      inputNgEl.bind('blur', function() {
        var valid = formCtrl[inputName].$invalid;
        el.toggleClass('has-success', !valid);
      });
      
      scope.$on('show-errors-check-validity', function() {
        el.toggleClass('has-error', formCtrl[inputName].$invalid);
      });
      
      scope.$on('show-errors-reset', function() {
          el.removeClass('has-error');
          el.removeClass('has-success');
      });
    }
  };
});
