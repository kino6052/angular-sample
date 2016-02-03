'use strict';

angular.module('oxhnApp')
  .directive('showErrors', function() {
  return {
    restrict: 'A',
    require: '^form',
    link: function (scope, el, attrs, formCtrl) {
      var findClosestParentThatHasInvalidProperty = function(element){
          if (!formCtrl[element.attr('name')] || formCtrl[element.attr('name')].$invalid === "undefined") return findClosestParentThatHasInvalidProperty(element.parent());
          else {
              return element
          }
      }
      // find the first form-control parent
      var findFormControl = function(mode, element, invalid) {
          if (element.hasClass("form-group")){
              if (mode == "toggle"){
                element.toggleClass('has-success', !invalid);
                element.toggleClass('has-error', invalid);
              }
              if (mode == "reset"){
                element.removeClass('has-error');
                element.removeClass('has-success');
              }
          }
          else {
              findFormControl(mode, element.parent(), invalid);
          }
      } 
      // find the text box element, which has the 'name' attribute
      var inputEl   = el[0].querySelector("[name]");
      // convert the native text box element to an angular element
      var inputNgEl = angular.element(inputEl);
      // get the name on the text box so we know the property to check

      var inputName = inputNgEl.attr('name');
      
      inputNgEl.bind('blur', function() {
        var elementWithValidation = findClosestParentThatHasInvalidProperty(inputNgEl);
        console.log(inputNgEl.attr('class'));
        findFormControl('reset', elementWithValidation);
        var invalid = formCtrl[elementWithValidation.attr('name')].$invalid; 
            findFormControl('toggle', elementWithValidation, invalid) 
      });
      
      scope.$on('show-errors-check-validity', function() {
        findFormControl('reset', el);
        var invalid;
        if (formCtrl[inputName]){
            invalid = formCtrl[inputName].$invalid
            findFormControl('toggle', el, invalid) 
            
        }
        else {
            invalid = inputNgEl.$invalid;
            findFormControl('toggle', el, invalid) 
        }   
      });
      
      scope.$on('show-errors-reset', function() {
          el.removeClass('has-error');
          el.removeClass('has-success');
      });
    }
  };
});
