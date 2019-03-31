import Vue from 'vue';

import {
  SET_DEVICE_ID
} from './mutation_types';

export const mutations = {
  [SET_DEVICE_ID](state, payload) {
    Vue.set(state, 'device_id', payload);
  }
};
