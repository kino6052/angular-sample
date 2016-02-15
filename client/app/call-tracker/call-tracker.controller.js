'use strict';

angular.module('oxhnApp')
    .controller('CallTrackerCtrl', function($scope, $http, $timeout, CallTracker, Modal, Auth) {
        // Calendar 
        $scope.users = [];

        // GETTER METHODS
        $scope.getPatient = function() {
            return $scope.user;
        }
        $scope.getCurrentUser = function() {
            try {
                return Auth.getCurrentUser()._id;
            } catch (err) {
                return 0;
            }
            return 0;;
        };
        $scope.getCurrentRole = function() {
            try {
                return Auth.getCurrentUser().role;
            } catch (err) {
                console.log(err)
            }
            return '';
        }

        $scope.getFollowupDate = function(value) {
                $scope.user.ocFollowUp = moment(value.toUTCString()).utc();
                console.log(value.toUTCString());
            }
            // SETTER METHODS

        $scope.setCallType = function(key) {
            $scope.resetCallType();
            switch (key) {
                case 'New':
                    $scope.user.callType = 'New';
                    $scope.user.referral = 'TV';
                    $scope.user.tv = 'Ch. 5 CBS';
                    $scope.user.outcome = 'Other';
                    break;
                case 'Change':
                    $scope.user.callType = 'Change';
                    $scope.user.outcome = 'Other';
                    break;
                case 'Cancel':
                    $scope.user.callType = 'Cancel';
                    $scope.user.outcome = 'Other';
                    break;
                case 'Billing':
                    $scope.user.callType = 'Billing';
                    $scope.user.outcome = 'Other';
                    break;
                case 'Other':
                    $scope.user.callType = 'Other';
                    $scope.user.outcome = 'Other';
                    break;
                default:
                    break;
            }
        }

        $scope.setOutcome = function(key) {
            $scope.resetOutcome();
            switch (key) {
                case 'Scheduled':
                    $scope.user.outcome = 'Scheduled';
                    $scope.user.referral = 'TV';
                    $scope.user.tv = 'Ch. 5 CBS';
                    break;
                case 'Rescheduled':
                    $scope.user.outcome = 'Rescheduled';
                    $scope.user.location = 'Phoenix';
                    break;
                case 'Followup':
                    $scope.user.outcome = 'Followup';
                    $scope.user.followupDate = '0';
                    $scope.setFollowupDate($scope.user.followupDate);
                    break;
                case 'Insurance':
                    $scope.user.outcome = 'Insurance';
                    break;
                case 'Referral':
                    $scope.user.outcome = 'Referral';
                    break;
                case 'Other':
                    $scope.user.outcome = 'Other';
                    break;

                default:
                    break;
            }
        }

        $scope.setFollowupDate = function(value) {
            $scope.user.ocFollowUp = moment().add(parseInt(value), 'days').utc();
        }

        // INITALIZATION
        $scope.userId = $scope.getCurrentUser();
        $scope.CallTracker = CallTracker;


        // Model 
        $scope.makeNewPatient = function() {
            $scope.user = CallTracker.Patient();
        }
        $scope.initiateUser = function() {
            $scope.makeNewPatient();
            $scope.user.callInitiated = moment().utc();
            $scope.user.user = $scope.userId;
        };
        $scope.initiateUser();

        // Form Properties
        $scope.isVisible = true;
        $scope.successSwitchState = false;
        $scope.successSwitch = function(callback) {
            $scope.successSwitchState = !$scope.successSwitchState;
            try {
                callback();
            } catch (err) {
                console.log(err);
            }
        };
        $scope.failureSwitchState = false;
        $scope.failureSwitch = function(callback) {
            $scope.failureSwitchState = !$scope.failureSwitchState;
            try {
                callback();
            } catch (err) {
                console.log(err);
            }
        };

        $scope.click = function($event) {
            angular.element(
                angular.element(
                    angular.element($event.currentTarget).parent()
                ).children()[1]
            ).toggle('ng-show');
        }

        // Dropdowns
        $scope.updateForm = function(section) {
            switch (section) {
                case 'callType':
                    $scope.user.referral = '';
                    $scope.resetCallType();
                    break;
                case 'outcome':
                    $scope.resetOutcome();
                    break;
                default:
                    break;
            }
        }


        $scope.resetCallType = function() {
            $scope.user.callType = "New";
            CallTracker.getOwnProperties($scope.user, function(property) {
                if ($.inArray(property, ['callInitiated', 'referralRequired', 'callType']) === -1) {
                    $scope.user[property] = '';
                }
            });
        }

        $scope.resetOutcome = function() {
            CallTracker.getOwnProperties($scope.user, function(property) {
                if ($.inArray(property, ['callInitiated', 'referralRequired', 'callType', 'referral', 'tv', 'callTypeOther']) === -1) {
                    $scope.user[property] = '';
                }
            });
        }

        $scope.updateReferral = function(value) {
            $scope.resetCallType();
            $scope.user.referral = value;
        }

        $scope.updateChannel = function(value) {
            $scope.resetCallType();
            $scope.user.referral = 'TV';
            $scope.user.tv = value;
        }

        $scope.updateNewspaper = function(value) {
            $scope.resetCallType();
            $scope.user.referral = 'Newspaper';
            $scope.user.newspaper = value;
        }

        $scope.updateLocation = function(value) {
            $scope.user.location = value;
        }

        $scope.confirm = function() {
            $scope.$broadcast('show-errors-check-validity');

            if ($scope.userForm.$invalid) {
                return;
            }
            Modal.confirm.verify("Check the Information for Correctness")($scope.user, function() {
                $scope.save();
            })
        }

        // Save User
        $scope.save = function() {
            $scope.isVisible = false;
            $http.post('/api/call-tickets', $scope.user).then(
                function(data) {
                    $scope.successSwitch();
                    $scope.initiateUser();
                    $scope.$broadcast('show-errors-reset');
                    $timeout(() => {
                        $scope.successSwitch(() => {
                            $scope.isVisible = true;
                        })
                    }, 2000);
                },
                function(error) {
                    $scope.failureSwitch();
                    $timeout(() => {
                        $scope.failureSwitch(() => {
                            $scope.isVisible = true;
                        })
                    }, 2000);
                }
            );
        };

        // Get Data
        $scope.getData = function() {
            console.log($scope.getCurrentRole());

            if ($scope.getCurrentRole() === "admin") {
                $http.get('/api/call-tickets/regular/').then(
                    function(response) {
                        $scope.users = response.data;
                    },
                    function(error) {
                        console.log(error);
                    }
                );
            } else {
                $http.get('/api/call-tickets/filtered/' + $scope.getCurrentUser()).then(
                    function(response) {
                        $scope.users = response.data;
                    },
                    function(error) {
                        console.log(error);
                    }
                );
            }
        };
    });