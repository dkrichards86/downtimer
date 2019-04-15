import Vue from 'vue';

import {
  SET_PLAY_CHIME,
  SET_CHIME,
  SET_STATS_WINDOW,
} from './mutation_types';

export const mutations = {
  [SET_PLAY_CHIME](state, payload) {
    Vue.set(state, 'play_chime', payload);
  },
  [SET_CHIME](state, payload) {
    Vue.set(state, 'chime', payload);
  },
  [SET_STATS_WINDOW](state, payload) {
    Vue.set(state, 'stats_window', payload);
  },
};
