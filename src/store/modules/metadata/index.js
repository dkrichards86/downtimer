import Vue from 'vue';
import Vuex from 'vuex';
import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';

Vue.use(Vuex);

const state = {
  device_id: null,
};

export default {
  state, getters, actions, mutations,
};
