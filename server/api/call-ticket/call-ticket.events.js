/**
 * CallTicket model events
 */

'use strict';

import {EventEmitter} from 'events';
var CallTicket = require('../../sqldb').CallTicket;
var CallTicketEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CallTicketEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  CallTicket.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    CallTicketEvents.emit(event + ':' + doc._id, doc);
    CallTicketEvents.emit(event, doc);
    done(null);
  }
}

export default CallTicketEvents;
