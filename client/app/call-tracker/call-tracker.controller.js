'use strict';

angular.module('oxhnApp')
  .controller('CallTrackerCtrl', function ($http, $scope, $timeout, Auth, callTracker, webService) {
    
    /* Initialize Scope Variables */
    
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.user = callTracker.user;
    $scope.users = [];
    
    
    // Form Properties (Should be Part of Form Directive)
    $scope.isVisible=true;
    $scope.successSwitchState=false;
    $scope.successSwitch=function(callback){
        $scope.successSwitchState=!$scope.successSwitchState;
        try {
            callback();
        } catch (err) {
            console.log(err);
        }
    };
    
    $scope.click = ($event) => {
        angular.element(
            angular.element(
                angular.element($event.currentTarget).parent()
            ).children()[1]
        ).toggle('ng-show');
    }
    
    /* Behaviour */
    
    /**
     * Saves to the Call Log
     * @param  {String} endpoint    - url of the endpoint to which POST request is sent
     * @param  {Object} data        - data to be submitted
     */
    $scope.post = (endpoint, data) => {
        // Check for Errors and Display Error Messages
        // TODO: Make a hook instead of binding to a scope variable.
        // This way it can be abstracted into a service.
        // For example a hook like 
        //      showErrorsHook = showErrorsFunction (@param)
        $scope.$broadcast('show-errors-check-validity');
        // Prevent from Submitting in Case of Errors
        if ($scope.userForm.$invalid) { return; }
        // Hide Form
        //Form.hide();
        // Save Entry to the Database
        webService.post(endpoint, data, ()=>{}, ()=>{});
        // Reset Error Messages
        $scope.$broadcast('show-errors-reset');
        // Show the Form
        //Form.show();   
    }
    $scope.save = () => { $scope.post('/api/call-tickets', $scope.user) };
    
    /**
     * Gets the Call Log Data
     * @param  {String} endpoint    - url of the endpoint to which GET request is sent
     */
    $scope.get = (endpoint) => {
        // Set users to response data (Seems to be not safe to assign to a global variable)
        // TODO: Find out how to do this without using outer scope variable
        webService.get(endpoint, (response) => {$scope.users = response.data;});
    }
    $scope.getData = () => { $scope.get('/api/call-tickets'); }
  });
