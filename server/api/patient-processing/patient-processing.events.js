/**
 * PatientProcessing model events
 */

'use strict';

import {EventEmitter} from 'events';
var PatientProcessing = require('../../sqldb').PatientProcessing;
var PatientProcessingEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PatientProcessingEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  PatientProcessing.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    PatientProcessingEvents.emit(event + ':' + doc._id, doc);
    PatientProcessingEvents.emit(event, doc);
    done(null);
  }
}

export default PatientProcessingEvents;
