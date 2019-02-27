import Vue from 'vue';
import Vuex from 'vuex';
import shortid from 'shortid';
import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';

Vue.use(Vuex);

const DEFAULT_TIMER = {
  title: '20 minutes',
  duration: 1200,
  uid: shortid.generate()
};

const state = {
  active_timer: DEFAULT_TIMER.uid,
  timers: [DEFAULT_TIMER],
  timer_status: -1,
  timer_value: DEFAULT_TIMER.duration
};

export default {
  state, getters, actions, mutations,
};
