import Vue from 'vue';
import Vuex from 'vuex';
import shortid from 'shortid';
import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';

import { TIMER_STATUSES } from '../../../utils/timer';

Vue.use(Vuex);

const DEFAULT_TIMER = {
  title: '20 minutes',
  duration: 1200,
  uid: shortid.generate()
};

const state = {
  active_timer: DEFAULT_TIMER.uid,
  timers: [DEFAULT_TIMER],
  timer_status: TIMER_STATUSES.STOPPED,
  timer_value: DEFAULT_TIMER.duration,
  current_run_id: null
};

export default {
  state, getters, actions, mutations,
};
