import Vue from 'vue';

import {
  SET_ACTIVE_TIMER,
  SET_PLAY_SOURCE,
  SET_TIMERS,
  SET_TIMER_STATUS,
  UPDATE_TIMER_VALUE
} from './mutation_types';

export const mutations = {
  [SET_ACTIVE_TIMER](state, payload) {
    Vue.set(state, 'active_timer', payload);
  },
  [SET_PLAY_SOURCE](state, payload) {
    Vue.set(state, 'play_source', payload);
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
};
