/**
 * PatientProcessingTemp model events
 */

'use strict';

import {EventEmitter} from 'events';
var PatientProcessingTemp = require('../../sqldb').PatientProcessingTemp;
var PatientProcessingTempEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PatientProcessingTempEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  PatientProcessingTemp.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    PatientProcessingTempEvents.emit(event + ':' + doc._id, doc);
    PatientProcessingTempEvents.emit(event, doc);
    done(null);
  }
}

export default PatientProcessingTempEvents;
