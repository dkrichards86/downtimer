import Vue from 'vue';
import Vuex from 'vuex';
import timers from './modules/timers';
import settings from './modules/settings';
import metadata from './modules/metadata';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    timers, settings, metadata
  }
});
