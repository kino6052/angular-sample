'use strict';

angular.module('form.module')
  .factory('submitForm', function () {
        class submitFormService {
            constructor(scope) {
                this.scope = scope;
            }
            submit(formObject, apiUrl) {

                
            }
            reset() {
                return 'test';
            }
            remove() {
                return 'test';
            }
        };
        return submitFormService;
  });
