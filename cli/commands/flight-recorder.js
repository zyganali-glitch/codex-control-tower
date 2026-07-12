'use strict';

const { appendFlightEvent, readFlightEvents } = require('../lib/flightRecorder');
const { resolveTarget } = require('../lib/safeFs');

async function flightRecorderCommand(args) {
  const target = resolveTarget(args.target || '.');
  if (args.event) {
    const event = appendFlightEvent(target, args.event, args.message, args.source || 'cct-cli');
    console.log(`Flight event recorded: ${event.type} at ${event.timestamp}`);
    return event;
  }
  const events = readFlightEvents(target);
  console.log(JSON.stringify(events, null, 2));
  return events;
}

module.exports = { flightRecorderCommand };
