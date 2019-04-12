import sinon from 'sinon';
import find from 'lodash/find';

export const state = {
  active_timer: 'foo',
  timers: [
    {
      uid: 'foo',
      title: "test timer",
      duration: 1500
    },
    {
      uid: 'bar',
      title: "test timer",
      duration: 1200
    }
  ],
  chime: 'arpeggio',
  play_chime: false,  
  timer_status: -1,
  timer_value: 0,
  stats_window: 14,
  device_id: "foobarbaz",
  current_run_id: null
};

export const actions = {
  setActiveTimer: sinon.stub(),
  setPlayChime: sinon.stub(),
  setStatsWindow: sinon.stub(),
  setChime: sinon.stub(),
  hydrateTimers: sinon.stub(),
  hydrateSettings: sinon.stub(),
  hydrateMetadata: sinon.stub(),
  hydrate: sinon.stub(),
  sync: sinon.stub(),
  incrementTimer: sinon.stub(),
  removeTimer: sinon.stub(),
  setTimers: sinon.stub(),
  updateTimers: sinon.stub(),
  setTimerStatus: sinon.stub(),
  updateTimerValue: sinon.stub(),
  initTimer: sinon.stub(),
  startTimer: sinon.stub(),
  pauseTimer: sinon.stub(),
  resumeTimer: sinon.stub(),
  resetTimer: sinon.stub(),
  completeTimer: sinon.stub(),
  
};

export const getters = {
  getActiveTimer: state => state.active_timer,
  getPlayChime: state => state.play_chime,
  getChime: state => state.chime,
  getTimerById: state => uid => find(state.timers, d => d.uid === uid),
  getTimers: state => state.timers,
  getTimerStatus: state => state.timer_status,
  getTimerValue: state => state.timer_value,
  getStatsWindow: state => state.stats_window,
  getDeviceId: state => state.device_id,
  getCurrentRunId: state => state.current_run_id
};