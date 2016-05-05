'use strict';

angular.module('form.module')
.directive('numberDirective', function($filter, $browser) {
    return {
        require: 'ngModel',
        link: function(scope, el, attrs, ngModelCtrl){
            var listener = function() {
                var value = el.val().replace(/[^0-9]/g, '');
                el.val(value);
            };
            el.bind('keydown', function(event) {
                var key = event.keyCode;
                // If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
                // This lets us support copy and paste too
                if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)){
                    return;
                }
                $browser.defer(listener); // Have to do this or changes don't get picked up properly
            });
            el.bind('change', listener);
            
            // This runs when we update the text field
            ngModelCtrl.$parsers.push(function(viewValue) {
                return viewValue.replace(/[A-Za-z]/g, '').replace(/(^[0-9]{0, 3})\d+/g, '$1');
            });

            // This runs when the model gets updated on the scope directly and keeps our view in sync
            ngModelCtrl.$render = function() {
                el.val(ngModelCtrl.$viewValue);
            };
        }
    };
});