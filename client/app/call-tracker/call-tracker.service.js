'use strict';

angular.module('oxhnApp')
  .factory('CallTracker', ['Auth', function (Auth) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    // Save User
        this.getCurrentUser = function(){
            try { return Auth.getCurrentUser().profile.name; } catch (err) { console.log(err) }
            return '';
        };
        
        // Calendar
        
        this.today = function() {
            this.dt = new Date();
            return this.dt;
        };
        this.clear = function() {
            this.dt = null;
        };
        // Disable weekend selection
        this.disabled = function(date, mode) {
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        };
        this.toggleMin = function() {
            this.minDate = this.minDate ? null : new Date();
        };
        this.minDate = this.today();
        this.maxDate = new Date(2016, 5, 22),
        this.open = function() {
            this.popup.opened = true;
        };
        this.setDate = function(year, month, day) {
            this.dt = new Date(year, month, day);
        };
        this.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };
        this.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'],
        this.format = this.formats[0],
        this.altInputFormats = ['M!/d!/yyyy'],
        this.popup = {
            opened: false
        }
        this.user = {
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
        return {
            Patient: function(){
                return {
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
            },
            user: this.user,
            getCurrentUser: this.getCurrentUser,
            today: this.today,
            clear: this.clear,
            // Disable weekend selection
            disabled: this.disabled,
            toggleMin: this.toggleMin,
            maxDate: this.maxDate,
            open: this.open,
            setDate: this.setDate,
            dateOptions: this.dateOptions,
            formats: this.formats,
            format: this.format,
            altInputFormats: this.altInputFormats,
            popup: this.popup
        }
  }]);
