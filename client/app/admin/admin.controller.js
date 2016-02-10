'use strict';

(function() {

class AdminController {
  constructor(User, $http) {
    // Use the User $resource to fetch all users
    this.users = User.query();
    this.http = $http;
  }

  delete(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }
  
  switchState(user) {
    this.http.put('/api/users/' + user._id + '/state').then(
        (response) => {this.users[this.users.indexOf(user)].state = !this.users[this.users.indexOf(user)].state},
        (err) => {console.log(err)}
    );
  }
}

angular.module('oxhnApp.admin')
  .controller('AdminController', AdminController);

})();
