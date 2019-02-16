import find from 'lodash/find';

export const getters = {
  getActiveTimer: state => state.active_timer,
  getPlaySource: state => state.play_source,
  getTimers: state => state.timers,
  getTimerById: state => uid => find(state.timers, d => d.uid === uid),
  getHistory: state => state.history,
  getTimerStatus: state => state.timer_status,
  getTimerValue: state => state.timer_value
};
