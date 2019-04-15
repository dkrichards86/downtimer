import find from 'lodash/find';

export const getters = {
  getActiveTimer: state => state.active_timer,
  getTimers: state => state.timers,
  getTimerById: state => uid => find(state.timers, d => d.uid === uid),
  getTimerStatus: state => state.timer_status,
  getTimerValue: state => state.timer_value,
  getCurrentRunId: state => state.current_run_id,
};
