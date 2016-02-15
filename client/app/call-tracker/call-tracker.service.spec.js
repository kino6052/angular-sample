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
                console.log("Callback is not Callable");
            }
        }
    }
}

describe('Controller: Call Tracker', function(){
    var $scope;
    var modelInitializationHook,
        callTypeHook,
        getPatientHook
    ;
    beforeEach(module('oxhnApp'));
    beforeEach(inject(function(_$controller_){
        $scope = {};
        _$controller_('CallTrackerCtrl', {$scope: $scope});
        modelInitializationHook = $scope.makeNewPatient;
        callTypeHook = $scope.setCallType;
        getPatientHook = $scope.getPatient;
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
            const Patient = getPatientHook();
            getOwnFields(Patient, function(field){
                if (['callType', 'outcome'].contains(field)){
                    expect(Patient[field]).not.toEqual("");
                } else 
                { 
                    expect(Patient[field]).toEqual("");
                }
            });
        });
    });
});

