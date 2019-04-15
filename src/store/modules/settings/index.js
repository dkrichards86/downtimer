import Vue from 'vue';
import Vuex from 'vuex';
import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';

Vue.use(Vuex);

const state = {
  chime: 'arpeggio',
  play_chime: false,
  stats_window: 14,
};

export default {
  state, getters, actions, mutations,
};
