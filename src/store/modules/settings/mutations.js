import Vue from 'vue';

import {
  SET_AUTOPLAY,
  SET_CYCLE,
  SET_PLAY_CHIME,
  SET_CHIME,
  SHOW_STATS_INTERRUPTIONS,
  SET_STATS_WINDOW
} from './mutation_types';

export const mutations = {
  [SET_AUTOPLAY](state, payload) {
    Vue.set(state, 'autoplay', payload);
  },
  [SET_CYCLE](state, payload) {
    Vue.set(state, 'cycle', payload);
  },
  [SET_PLAY_CHIME](state, payload) {
    Vue.set(state, 'play_chime', payload);
  },
  [SET_CHIME](state, payload) {
    Vue.set(state, 'chime', payload);
  },
  [SHOW_STATS_INTERRUPTIONS](state, payload) {
    Vue.set(state, 'stats_interruptions', payload);
  },
  [SET_STATS_WINDOW](state, payload) {
    Vue.set(state, 'stats_window', payload);
  }
};
