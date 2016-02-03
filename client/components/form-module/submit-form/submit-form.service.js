'use strict';

formModule
  .factory('submitForm', function () {
        class submitFormService {
            constructor(scope) {
                this.scope = scope;
            }
            submit() {
                super.update();
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
