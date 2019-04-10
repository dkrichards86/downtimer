import Vue from 'vue';

import {
  SET_ACTIVE_TIMER,
  SET_TIMERS,
  SET_TIMER_STATUS,
  UPDATE_TIMER_VALUE,
  SET_CURRENT_RUN_ID
} from './mutation_types';

export const mutations = {
  [SET_ACTIVE_TIMER](state, payload) {
    Vue.set(state, 'active_timer', payload);
  },
  [SET_TIMERS](state, payload) {
    Vue.set(state, 'timers', payload);
  },
  [SET_TIMER_STATUS](state, payload) {
    Vue.set(state, 'timer_status', payload);
  },
  [UPDATE_TIMER_VALUE](state, payload) {
    Vue.set(state, 'timer_value', payload);
  },
  [SET_CURRENT_RUN_ID](state, payload) {
    Vue.set(state, 'current_run_id', payload);
  }
};
