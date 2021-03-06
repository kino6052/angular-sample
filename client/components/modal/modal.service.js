'use strict';

angular.module('oxhnApp')
  .factory('Modal', function ($rootScope, $modal) {
    /**
     * Opens a modal
     * @param  {Object} scope      - an object to be merged with modal's scope
     * @param  {String} modalClass - (optional) class(es) to be applied to the modal
     * @return {Object}            - the instance $modal.open() returns
     */
    function openModal(scope = {}, modalClass = 'modal-default') {
      var modalScope = $rootScope.$new();

      angular.extend(modalScope, scope);

      return $modal.open({
        templateUrl: 'components/modal/modal.html',
        windowClass: modalClass,
        scope: modalScope
      });
    }

    // Public API here
    return {

      /* Confirmation modals */
      confirm: {

        /**
         * Create a function to open a delete confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
         * @param  {Function} del - callback, ran when delete is confirmed
         * @return {Function}     - the function to open the modal (ex. myModalFn)
         */
        delete(del = angular.noop) {
          /**
           * Open a delete confirmation modal
           * @param  {String} name   - name or info to show on modal
           * @param  {All}           - any additional args are passed straight to del callback
           */
          return function() {
            var args = Array.prototype.slice.call(arguments),
                name = args.shift(),
                deleteModal;

            deleteModal = openModal({
              modal: {
                dismissable: true,
                title: 'Confirm Delete',
                html: '<p>Are you sure you want to delete <strong>' + name + '</strong> ?</p>',
                buttons: [{
                  classes: 'btn-danger',
                  text: 'Delete',
                  click: function(e) {
                    deleteModal.close(e);
                  }
                }, {
                  classes: 'btn-default',
                  text: 'Cancel',
                  click: function(e) {
                    deleteModal.dismiss(e);
                  }
                }]
              }
            }, 'modal-danger');

            deleteModal.result.then(function(event) {
              del.apply(event, args);
            });
          };
        },
        
        verify(ver = angular.noop) {
          /**
           * Open a delete confirmation modal
           * @param  {String} name   - name or info to show on modal
           * @param  {All}           - any additional args are passed straight to del callback
           */
          return function() {
            var args = Array.prototype.slice.call(arguments),
                user = args.shift(),
                callback = args.shift(),
                verifyModal;

            verifyModal = openModal({
              modal: {
                dismissable: true,
                title: "Confirm the Infromation You've Entered is Correct",
                html: ((user) => {
                    var result = '<table class="table table-striped"><tbody>';
                    for (var key in user){
                        if (user.hasOwnProperty(key)){
                            result += '<tr><td><strong>' + key + "</strong></td><td>" + user[key] + '</td></tr>'
                        }
                    }
                    result += "</tbody></table>";
                    return result;
                    
                })(user),
                buttons: [{
                  classes: 'btn-danger',
                  text: 'Confirm',
                  click: function(e) {
                    verifyModal.close(e);
                  }
                }, {
                  classes: 'btn-default',
                  text: 'Cancel',
                  click: function(e) {
                    verifyModal.dismiss(e);
                  }
                }]
              }
            }, 'modal-success');

            verifyModal.result.then(function(event) {
                try {callback()} catch (error) {console.log(error)};
            });
          };
        },
        
        success(suc = angular.noop) {
          /**
           * Open a delete confirmation modal
           * @param  {Function} callback   - callback to execute after modal is closed
           * @param  {All}           - any additional args are passed straight to del callback
           */
          return function() {
            var args = Array.prototype.slice.call(arguments),
                callback = args.shift(),
                successModal;
                

            successModal = openModal({
              modal: {
                dismissable: true,
                title: 'Success!',
                html: '<p>The form was successfully saved!</p>',
                buttons: [{
                  classes: 'btn-success',
                  text: 'Ok',
                  click: function(e) {
                    successModal.close(e);
                    try {
                        callback();
                    }
                    catch(err) { console.log(err); }
                  }
                }]
              }
            }, 'modal-success');

            successModal.result.then(function(event) {
              suc.apply(event, args);
            });
          };
        }
      }
    };
  });
