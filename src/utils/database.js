import Dexie from 'dexie';

const db = new Dexie('downtimer');
db.version(1).stores({ events: '++id', runs: 'runId' });

export const loadEvents = (callback) => db.events.toArray(callback);

export const saveEvent = (eventData) => db.events.add(eventData);

export const loadRuns = (callback) => db.runs.toArray(callback);

export const saveRun = (runData) => db.runs.add(runData);

export default db;
