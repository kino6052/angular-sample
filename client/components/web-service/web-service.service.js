'use strict';

angular.module('oxhnApp')
  .factory('webService', ['$http', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    // Save User
    return {
        get: function(endpoint, successCallback, failureCallback){
            $http.get(endpoint).then(
                (response) => { try { successCallback(response); } catch(error) { console.log(error); }; },
                (response) => { try { failureCallback(response); } catch(error) { console.log(error); }; }
            )
        },
        post: function(endpoint, data, successCallback, failureCallback){
            $http.post(endpoint, data).then(
                (response) => { try { successCallback(response); } catch(error) { console.log(error); }; },
                (response) => { try { failureCallback(response); } catch(error) { console.log(error); }; }
            )
        }
    } 
  }]);
