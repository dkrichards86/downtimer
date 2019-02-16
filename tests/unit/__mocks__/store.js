import Vuex from 'vuex';
import sinon from 'sinon';
import find from 'lodash/find';

export const state = {
  active_timer: 'foo',
  autoplay: false,
  cycle: false,
  playSource: 'user',
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
  history: [],
  chime: 'arpeggio',
  play_chime: false,  
  timer_status: -1,
  timer_value: 0,
  stats_interruptions: false,
  stats_window: 14
};

export const actions = {
  setActiveTimer: sinon.stub(),
  setAutoplay: sinon.stub(),
  setCycle: sinon.stub(),
  setPlayChime: sinon.stub(),
  setStatsInterruptions: sinon.stub(),
  setStatsWindow: sinon.stub(),
  setChime: sinon.stub(),
  hydrateTimers: sinon.stub(),
  hydrateSettings: sinon.stub(),
  incrementTimer: sinon.stub(),
  removeTimer: sinon.stub(),
  setTimers: sinon.stub(),
  updateTimers: sinon.stub(),
  updateHistory: sinon.stub(),
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
  getAutoplay: state => state.autoplay,
  getPlaySource: state => state.play_source,
  getHistory: state => state.history,
  getCycle: state => state.cycle,
  getPlayChime: state => state.play_chime,
  getChime: state => state.chime,
  getTimerById: state => uid => find(state.timers, d => d.uid === uid),
  getTimers: state => state.timers,
  getTimerStatus: state => state.timer_status,
  getTimerValue: state => state.timer_value,
  getStatsInterruptions: state => state.stats_interruptions,
  getStatsWindow: state => state.stats_window
};