import cloneDeep from 'lodash/cloneDeep';
import moment from 'moment';
import find from 'lodash/find';
import shortid from 'shortid';

import {
  SET_ACTIVE_TIMER,
  SET_TIMERS,
  SET_TIMER_STATUS,
  UPDATE_TIMER_VALUE,
  SET_CURRENT_RUN_ID
} from './mutation_types';

import { Storage } from '../../../utils/storage';

import { extractTimers } from '../../../utils/helpers';

import { Timer, TIMER_STATUSES } from '../../../utils/timer';

const timerStorage = new Storage('timers');
const runStorage = new Storage('runs');
const eventStorage = new Storage('events');

const timer = new Timer();

export const actions = {
  setActiveTimer(store, payload) {
    store.commit(SET_ACTIVE_TIMER, payload);
    const duration = find(store.state.timers, d => d.uid === payload);
    store.commit(UPDATE_TIMER_VALUE, duration.duration);
  },
  hydrateTimers(store) {
    const timers = timerStorage.load();

    if (timers) {
      store.commit(SET_TIMERS, timers);

      if (timers.length) {
        store.commit(SET_ACTIVE_TIMER, timers[0].uid);
      }
    }
  },
  removeTimer(store, payload) {
    const durations = cloneDeep(store.state.timers).filter(d => d.uid !== payload);
    store.commit(SET_TIMERS, durations);
    timerStorage.save(extractTimers(store.state.timers));
  },
  setTimers(store, payload) {
    store.commit(SET_TIMERS, payload);
  },
  updateTimers(store, payload) {
    const durations = cloneDeep(store.state.timers);
    const editIndex = durations.findIndex(d => d.uid === payload.editId);

    if (editIndex !== -1) {
      const editDuration = durations[editIndex];
      editDuration.duration = payload.duration;
      editDuration.title = payload.title;
      editDuration.uid = payload.uid;
      durations.splice(editIndex, 1, editDuration);

      if (store.state.active_timer === payload.editId) {
        store.commit(SET_ACTIVE_TIMER, payload.uid);
      }
    } else {
      const newDuration = {
        title: payload.title,
        duration: payload.duration,
        uid: payload.uid
      };
      durations.push(newDuration);
    }

    store.commit(SET_TIMERS, durations);
    timerStorage.save(extractTimers(store.state.timers));
  },
  setTimerStatus(store, payload) {
    store.commit(SET_TIMER_STATUS, payload);
  },
  updateTimerValue(store, payload) {
    store.commit(UPDATE_TIMER_VALUE, payload);
  },
  initTimer(store) {
    timer.setCompletionCallback(() => store.dispatch('completeTimer'));
    timer.setTickCallback((ms) => store.dispatch('updateTimerValue', ms));
  },
  completeTimer(store) {
    store.dispatch('setTimerStatus', TIMER_STATUSES.EXPIRED);
    store.dispatch('logEvent', 'expiry');
  },
  logEvent(store, payload) {
    if (store.state.current_run_id) {
      const allEvents = eventStorage.load() || [];
      const datetime = moment().format('X');
      const event = payload;
      const runId = store.state.current_run_id;
      const synced = false;

      const eventData = {
        datetime, event, runId, synced
      };

      allEvents.push(eventData);

      eventStorage.save(allEvents);
    }
  },
  logRun(store, payload) {
    const allRuns = runStorage.load() || [];

    const { duration } = payload;
    const runId = store.state.current_run_id;
    const synced = false;
    const runData = { runId, duration, synced };

    allRuns.push(runData);
    runStorage.save(allRuns);
  },
  pauseTimer(store) {
    timer.stop();
    store.dispatch('setTimerStatus', TIMER_STATUSES.PAUSED);
    store.dispatch('logEvent', 'pause');
  },
  resetTimer(store) {
    if (store.state.timer_status !== TIMER_STATUSES.EXPIRED) {
      store.dispatch('logEvent', 'reset');
    }

    const uid = store.state.active_timer;
    const duration = find(store.state.timers, d => d.uid === uid);
    timer.stop();
    timer.setDuration(duration.duration);
    store.dispatch('updateTimerValue', duration.duration);
    store.dispatch('setTimerStatus', TIMER_STATUSES.RESET);
  },
  resumeTimer(store) {
    timer.start();
    store.dispatch('setTimerStatus', TIMER_STATUSES.PLAYING);
    store.dispatch('logEvent', 'resume');
  },
  startTimer(store) {
    const uid = store.state.active_timer;
    const duration = find(store.state.timers, d => d.uid === uid);
    timer.setDuration(duration.duration);

    store.dispatch('setCurrentRunId', shortid.generate());

    timer.start();
    store.dispatch('setTimerStatus', TIMER_STATUSES.PLAYING);
    store.dispatch('logEvent', 'start');

    store.dispatch('logRun', duration);
  },
  setCurrentRunId(store, payload) {
    store.commit(SET_CURRENT_RUN_ID, payload);
  },
  setRating(store, payload) {
    const allRuns = runStorage.load() || [];
    const runId = store.state.current_run_id;

    const ratedRuns = allRuns.map(r => {
      if (r.runId === runId) {
        r.rating = payload;
      }

      return r;
    });

    runStorage.save(ratedRuns);

    // moving timer status from expired to stopped removes the snackbar
    store.dispatch('setTimerStatus', TIMER_STATUSES.STOPPED);
  }
};
