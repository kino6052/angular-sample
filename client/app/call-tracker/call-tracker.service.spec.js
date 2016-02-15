'use strict';

var globalPatient = {
    callInitiated: '',
    callType: 'New',
    callTypeOther: '',
    doctorName: '',
    escalatedNotes: '',
    firstName: '',
    followupDate: '',
    insurance: '',
    lastName: '',
    location: '',
    newspaper: '',
    notes: '',
    ocFollowUp: '',
    outcome: 'Other',
    outcomeOther: '',
    patientName: '',
    phoneNumber: '',
    referral: '',
    referralOther: '',
    tv: '',
    user: ''
}

var getOwnFields = function(object, callback) {
    for (var field in object) {
        if (object.hasOwnProperty(field)) {
            try {
                callback(field);
            } catch (err) {
                console.log(err);
            }
        }
    }
}

function generateRandomString() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function dirtify(object) {
    getOwnFields(object, function(field) {
        if (field !== 'referralRequired') object[field] = generateRandomString();
    });
}

describe('Controller: Call Tracker', function() {
    var $scope;
    var callTypeHook,
        getPatientHook,
        modelInitializationHook,
        outcomeHook;
    beforeEach(module('oxhnApp'));
    beforeEach(inject(function(_$controller_) {
        $scope = {};
        _$controller_('CallTrackerCtrl', {
            $scope: $scope
        });
        modelInitializationHook = $scope.makeNewPatient;
        callTypeHook = $scope.setCallType;
        getPatientHook = $scope.getPatient;
        outcomeHook = $scope.setOutcome;
    }));

    describe('General', function() {
        it('should initiate patient model to default settings every time initiateUser() is called', function() {
            modelInitializationHook();

            expect(getPatientHook()).toEqual(globalPatient);
            getPatientHook().referral = 'referral';
            modelInitializationHook();
            expect(getPatientHook()).toEqual(globalPatient);
        });
        it('should have "Call Type" set to "New" and "Outcome" set to "Scheduled"', function() {
            modelInitializationHook();
            expect(getPatientHook().callType).toEqual('New');
            expect(getPatientHook().outcome).toEqual('Other');
        });
    });
    describe('Should Assign Date', function() {
        it('should have a default value for referral set to "TV"', function() {
            modelInitializationHook = $scope.initiateUser;
            modelInitializationHook();
            expect(typeof(getPatientHook().callInitiated)).toBe('object');
        });
    });
    describe('New Patient is Selected', function() {
        it('should have a default value for referral set to "TV"', function() {
            modelInitializationHook();
            callTypeHook('New');
            expect(getPatientHook().referral).toEqual("TV");
        });
        it('should have a default value for tv set to "Ch. 5 CBS"', function() {
            modelInitializationHook();
            callTypeHook('New');
            expect(getPatientHook().referral).toEqual("TV");
        });
        it('should have all fields except "Referral" and "Call Type" to be empty', function() {
            modelInitializationHook();
            callTypeHook('New');
            var Patient = getPatientHook();
            expect(Patient['callType']).toEqual("New");
            expect(Patient['outcome']).toEqual("Other");
            getOwnFields(Patient, function(field) {
                if ($.inArray(field, ['callType', 'outcome', 'referral', 'tv', 'referralRequired']) !== -1) {
                    if (field === 'referralRequired') expect(Patient[field].toEqual(false));
                } else {
                    expect(Patient[field]).toEqual("");
                }
            });
        });
        it('should reset children fields when outcome is set to "Scheduled"', function() {
            var Patient;
            // Outcome is Set to "Scheduled"
            modelInitializationHook();
            dirtify(Patient);
            callTypeHook('New');
            outcomeHook('Scheduled');
            Patient = getPatientHook();
            getOwnFields(Patient, function(field) {
                switch (field) {
                    case 'callType':
                        expect(Patient[field]).toEqual("New");
                        break;
                    case 'outcome':
                        expect(Patient[field]).toEqual("Scheduled");
                        break;
                    case 'referral':
                        expect(Patient[field]).toEqual("TV");
                        break;
                    case 'tv':
                        expect(Patient[field]).toEqual("Ch. 5 CBS");
                        break;
                    case 'referralRequired':
                        expect(Patient[field]).toEqual(false);
                        break;
                    default:
                        expect(Patient[field]).toEqual("");
                        break;
                }
            });
        });

        it('should reset children fields when outcome is set to "Followup"', function() {
            var Patient;
            // Outcome is Set to "Scheduled"
            modelInitializationHook();

            dirtify(Patient);
            callTypeHook('New');
            outcomeHook('Followup');
            Patient = getPatientHook();
            getOwnFields(Patient, function(field) {
                switch (field) {
                    case 'callType':
                        expect(Patient[field]).toEqual("New");
                        break;
                    case 'outcome':
                        expect(Patient[field]).toEqual("Followup");
                        break;
                    case 'referral':
                        expect(Patient[field]).not.toEqual("");
                        break;
                    case 'tv':
                        expect(Patient[field]).not.toEqual("");
                        break;
                    case 'followupDate':
                        expect(Patient[field]).toEqual("0");
                        break;
                    case 'ocFollowUp':
                        expect(typeof(Patient[field])).toEqual('object');
                        break;
                    case 'referralRequired':
                        expect(Patient[field]).toEqual(false);
                        break;
                    default:
                        expect(Patient[field]).toEqual("");
                        break;
                }
            });
        });
        it('should reset children fields when outcome is set to "Insurance"', function() {
            var Patient;
            // Outcome is Set to "Scheduled"
            modelInitializationHook();

            dirtify(Patient);
            callTypeHook('New');
            outcomeHook('Insurance');
            Patient = getPatientHook();
            getOwnFields(Patient, function(field) {
                switch (field) {
                    case 'callType':
                        expect(Patient[field]).toEqual("New");
                        break;
                    case 'outcome':
                        expect(Patient[field]).toEqual("Insurance");
                        break;
                    case 'referral':
                        expect(Patient[field]).toEqual("");
                        break;
                    case 'tv':
                        expect(Patient[field]).toEqual("");
                        break;
                    case 'referralRequired':
                        expect(Patient[field]).toEqual(false);
                        break;
                    default:
                        expect(Patient[field]).toEqual("");
                        break;
                }
            });
        });
        it('should reset children fields when outcome is set to "Other"', function() {
            var Patient;
            // Outcome is Set to "Scheduled"
            modelInitializationHook();
            dirtify(Patient);
            callTypeHook('New');
            outcomeHook('Other');
            Patient = getPatientHook();
            getOwnFields(Patient, function(field) {
                switch (field) {
                    case 'callType':
                        expect(Patient[field]).toEqual("New");
                        break;
                    case 'outcome':
                        expect(Patient[field]).toEqual("Other");
                        break;
                    case 'referral':
                        expect(Patient[field]).toEqual("");
                        break;
                    case 'tv':
                        expect(Patient[field]).toEqual("");
                        break;
                    case 'referralRequired':
                        expect(Patient[field]).toEqual(false);
                        break;
                    default:
                        expect(Patient[field]).toEqual("");
                        break;
                }
            });
        });
    });

    describe('Change is Selected', function() {
        it('should have all fields except "Call Type" and "Outcome" to be empty', function() {
            modelInitializationHook();
            callTypeHook('Change');
            var Patient = getPatientHook();
            expect(Patient['callType']).toEqual("Change");
            expect(Patient['outcome']).toEqual("Other");
            getOwnFields(Patient, function(field) {
                if ($.inArray(field, ['callType', 'outcome', 'referralRequired']) !== -1) {
                    if (field === 'referralRequired') expect(Patient[field].toEqual(false));
                } else {
                    expect(Patient[field]).toEqual("");
                }
            });
        });
        it('should reset children fields when outcome is set to "Rescheduled"', function() {
            var Patient;
            // Outcome is Set to "Scheduled"
            modelInitializationHook();
            dirtify(Patient);
            callTypeHook('Change');
            outcomeHook('Rescheduled');
            Patient = getPatientHook();
            getOwnFields(Patient, function(field) {
                switch (field) {
                    case 'callType':
                        expect(Patient[field]).toEqual("Change");
                        break;
                    case 'outcome':
                        expect(Patient[field]).toEqual("Rescheduled");
                        break;
                    case 'referral':
                        expect(Patient[field]).toEqual("");
                        break;
                    case 'tv':
                        expect(Patient[field]).toEqual("");
                        break;
                    case 'location':
                        expect(Patient[field]).toEqual("Phoenix");
                        break;
                    case 'referralRequired':
                        expect(Patient[field]).toEqual(false);
                        break;
                    default:
                        expect(Patient[field]).toEqual("");
                        break;
                }
            });
        });
        it('should reset children fields when outcome is set to "Followup"', function() {
            var Patient;
            // Outcome is Set to "Scheduled"
            modelInitializationHook();

            dirtify(Patient);
            callTypeHook('Change');
            outcomeHook('Followup');
            Patient = getPatientHook();
            getOwnFields(Patient, function(field) {
                switch (field) {
                    case 'callType':
                        expect(Patient[field]).toEqual("Change");
                        break;
                    case 'outcome':
                        expect(Patient[field]).toEqual("Followup");
                        break;
                    case 'referral':
                        expect(Patient[field]).toEqual("");
                        break;
                    case 'tv':
                        expect(Patient[field]).toEqual("");
                        break;
                    case 'followupDate':
                        expect(Patient[field]).toEqual("0");
                        break;
                    case 'ocFollowUp':
                        expect(typeof(Patient[field])).toEqual('object');
                        break;
                    case 'referralRequired':
                        expect(Patient[field]).toEqual(false);
                        break;
                    default:
                        expect(Patient[field]).toEqual("");
                        break;
                }
            });
        });
        it('should reset children fields when outcome is set to "Insurance"', function() {
            var Patient;
            // Outcome is Set to "Scheduled"
            modelInitializationHook();

            dirtify(Patient);
            callTypeHook('Change');
            outcomeHook('Insurance');
            Patient = getPatientHook();
            getOwnFields(Patient, function(field) {
                switch (field) {
                    case 'callType':
                        expect(Patient[field]).toEqual("Change");
                        break;
                    case 'outcome':
                        expect(Patient[field]).toEqual("Insurance");
                        break;
                    case 'referral':
                        expect(Patient[field]).toEqual("");
                        break;
                    case 'tv':
                        expect(Patient[field]).toEqual("");
                        break;
                    case 'referralRequired':
                        expect(Patient[field]).toEqual(false);
                        break;
                    default:
                        expect(Patient[field]).toEqual("");
                        break;
                }
            });
        });
        it('should reset children fields when outcome is set to "Other"', function() {
            var Patient;
            // Outcome is Set to "Scheduled"
            modelInitializationHook();
            dirtify(Patient);
            callTypeHook('Change');
            outcomeHook('Other');
            Patient = getPatientHook();
            getOwnFields(Patient, function(field) {
                switch (field) {
                    case 'callType':
                        expect(Patient[field]).toEqual("Change");
                        break;
                    case 'outcome':
                        expect(Patient[field]).toEqual("Other");
                        break;
                    case 'referral':
                        expect(Patient[field]).toEqual("");
                        break;
                    case 'tv':
                        expect(Patient[field]).toEqual("");
                        break;
                    case 'referralRequired':
                        expect(Patient[field]).toEqual(false);
                        break;
                    default:
                        expect(Patient[field]).toEqual("");
                        break;
                }
            });
        });
    });
});