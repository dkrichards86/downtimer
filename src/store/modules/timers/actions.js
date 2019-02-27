import cloneDeep from 'lodash/cloneDeep';
import moment from 'moment';
import find from 'lodash/find';
import shortid from 'shortid';

import {
  SET_ACTIVE_TIMER,
  SET_PLAY_SOURCE,
  SET_TIMERS,
  SET_TIMER_STATUS,
  UPDATE_TIMER_VALUE
} from './mutation_types';

import {
  extractTimers,
  loadTimers,
  saveTimers
} from '../../../utils/storage';

import {
  saveEvent, saveRun
} from '../../../utils/database';

import { Timer, TIMER_STATUSES } from '../../../utils/timer';

const timer = new Timer();
let currentRunId = null;

export const actions = {
  setActiveTimer(store, payload) {
    store.commit(SET_ACTIVE_TIMER, payload);
    store.commit(SET_PLAY_SOURCE, 'user');
    const duration = find(store.state.timers, d => d.uid === payload);
    store.commit(UPDATE_TIMER_VALUE, duration.duration);
  },
  hydrateTimers(store) {
    const timers = loadTimers();

    if (timers) {
      store.commit(SET_TIMERS, timers);

      if (timers.length) {
        store.commit(SET_ACTIVE_TIMER, timers[0].uid);
        store.commit(SET_PLAY_SOURCE, 'user');
      }
    }
  },
  incrementTimer(store) {
    const { timers } = store.state;

    if (timers.length > 1) {
      const currTimer = store.state.active_timer;
      let activeTimerIndex = timers.findIndex(d => d.uid === currTimer);
      activeTimerIndex++;

      if (activeTimerIndex < timers.length) {
        store.commit(SET_ACTIVE_TIMER, timers[activeTimerIndex].uid);
      } else if (store.state.cycle) {
        store.commit(SET_ACTIVE_TIMER, timers[0].uid);
      }
    } else if (timers.length === 1 && store.state.cycle) {
      // If we only have 1 timer but are set to autoincrement and cycle, we have
      // reset the timer, then manually transition to expired status to trigger
      // a rerender.
      store.dispatch('resetTimer');
      store.commit(SET_TIMER_STATUS, TIMER_STATUSES.EXPIRED);
    }

    store.commit(SET_PLAY_SOURCE, 'increment');
  },
  removeTimer(store, payload) {
    const durations = cloneDeep(store.state.timers).filter(d => d.uid !== payload);
    store.commit(SET_TIMERS, durations);
    saveTimers(extractTimers(store.state.timers));
  },
  setTimers(store, payload) {
    store.commit(SET_TIMERS, payload);
  },
  updateTimers(store, payload) {
    const durations = cloneDeep(store.state.timers);
    const editIndex = durations.findIndex(d => d.uid === payload.uid);

    if (editIndex !== -1) {
      const editDuration = durations[editIndex];
      editDuration.duration = payload.duration;
      editDuration.title = payload.title;
      durations.splice(editIndex, 1, editDuration);
    } else {
      const newDuration = {
        title: payload.title,
        duration: payload.duration,
        uid: payload.uid
      };
      durations.push(newDuration);
    }

    store.commit(SET_TIMERS, durations);
    saveTimers(extractTimers(store.state.timers));
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

    if (store.state.autoplay) {
      store.dispatch('incrementTimer');
    }
  },
  logEvent(store, payload) {
    const datetime = moment.now();
    const event = payload;
    const runId = currentRunId;

    const eventData = {
      datetime, event, runId
    };

    saveEvent(eventData);
  },
  logRun(store, payload) {
    const { duration, title } = payload;
    const runId = currentRunId;
    const runData = { runId, duration, title };

    saveRun(runData);
  },
  pauseTimer(store) {
    timer.stop();
    store.dispatch('setTimerStatus', TIMER_STATUSES.PAUSED);
    store.dispatch('logEvent', 'pause');
  },
  resetTimer(store) {
    if (store.state.timer_statue !== TIMER_STATUSES.EXPIRED) {
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

    currentRunId = shortid.generate();

    timer.start();
    store.dispatch('setTimerStatus', TIMER_STATUSES.PLAYING);
    store.dispatch('logEvent', 'start');

    store.dispatch('logRun', duration);
  },
};
