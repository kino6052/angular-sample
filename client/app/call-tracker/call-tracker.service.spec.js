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

var getOwnFields = function(object, callback){
    for (var field in object){
        if (object.hasOwnProperty(field)){
            try {
                callback(field);
            } catch (err) {
                console.log(err);
            }
        }
    }
}

describe('Controller: Call Tracker', function(){
    var $scope;
    var callTypeHook,
        getPatientHook,
        modelInitializationHook,
        outcomeHook
    ;
    beforeEach(module('oxhnApp'));
    beforeEach(inject(function(_$controller_){
        $scope = {};
        _$controller_('CallTrackerCtrl', {$scope: $scope});
        modelInitializationHook = $scope.makeNewPatient;
        callTypeHook = $scope.setCallType;
        getPatientHook = $scope.getPatient;
        outcomeHook = $scope.setOutcome;
    }));
    
    describe('General', function () {
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
    describe('New patient is selected', function () {
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
            getOwnFields(Patient, function(field){
                if ($.inArray(field, ['callType', 'outcome', 'referral', 'tv', 'referralRequired']) !== -1){
                    if (field === 'referralRequired') expect(Patient[field].toEqual(false));
                } else {
                    expect(Patient[field]).toEqual("");
                }
            });
        });
        it('should reset children fields when outcome is set to "Scheduled"', function(){
            var Patient;
            // Outcome is Set to "Scheduled"
            modelInitializationHook();
            Patient = getPatientHook();
            callTypeHook('New');
            outcomeHook('Scheduled');
            getOwnFields(Patient, function(field){
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
        it('should reset children fields when outcome is set to "Rescheduled"', function(){
            var Patient;
            // Outcome is Set to "Scheduled"
            modelInitializationHook();
            callTypeHook('Change');
            outcomeHook('Rescheduled');
            Patient = getPatientHook();
            getOwnFields(Patient, function(field){
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
                   case 'referralRequired':
                       expect(Patient[field]).toEqual(false);
                       break;
                   default:
                       expect(Patient[field]).toEqual("");
                       break;
               }
            });
        });
        it('should reset children fields when outcome is set to "Followup"', function(){
            var Patient;
            // Outcome is Set to "Scheduled"
            modelInitializationHook();
            callTypeHook('Cancel');
            outcomeHook('Followup');
            Patient = getPatientHook();
            getOwnFields(Patient, function(field){
               switch (field) {
                   case 'callType':
                       expect(Patient[field]).toEqual("Cancel");
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
    });
});

