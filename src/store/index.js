import Vue from 'vue';
import Vuex from 'vuex';
import timers from './modules/timers';
import settings from './modules/settings';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    timers, settings
  }
});
