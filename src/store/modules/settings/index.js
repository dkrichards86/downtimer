import Vue from 'vue';
import Vuex from 'vuex';
import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';

Vue.use(Vuex);

const state = {
  autoplay: false,
  cycle: false,
  chime: 'arpeggio',
  play_chime: false,
  stats_starts: true,
  stats_completions: true,
  stats_interruptions: false,
  stats_window: 14
};

export default {
  state, getters, actions, mutations,
};
