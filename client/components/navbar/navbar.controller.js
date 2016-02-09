'use strict';
var userData;

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Home',
    'state': 'main'
  }];

  isCollapsed = true;
  //end-non-standard

  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
    this.googleURL = Auth.getCurrentAvatar;
    
    //this.googleData = Auth.getCurrentUser().google?Auth.getCurrentUser().google:'';
  }
}

angular.module('oxhnApp')
  .controller('NavbarController', NavbarController);
