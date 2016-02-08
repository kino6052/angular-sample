'use strict';

angular.module('oxhnApp')
  .factory('callTracker', ['Auth', function (Auth) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    // Save User
    return {
        user: {
            callType: 'Change',
            outcome: 'Scheduled',
            textarea: '',
            callInitiated: moment().utc(),
            ocFollowUp: '2',
            user: Auth.getCurrentUser().name
        },
        getCurrentUser: function(){
            try { return Auth.getCurrentUser().profile.name; } catch (err) { console.log(err) }
            return '';
        }
    }
  }]);
