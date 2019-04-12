import Vuex from 'vuex';
import { expect } from 'chai';
import { actions } from '@/store/modules/settings/actions';
import { mutations } from '@/store/modules/settings/mutations';
import { state, getters } from '../../../__mocks__/store';
import { Storage } from '@/utils/storage';

import cloneDeep from 'lodash/cloneDeep';

const settingsStorage = new Storage('settings');

describe('store/modules/settings/actions.js', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      state: cloneDeep(state), getters, actions, mutations
    });
  });
  
  afterEach(() => {
    settingsStorage.clear();
  });

  describe('setPlayChime', () => {
    it('should set play chime setting', () => {
      actions.setPlayChime(store, true);
      expect(getters.getPlayChime(store.state)).to.be.true;
      
      const settings = settingsStorage.load();
      expect(settings.play_chime).to.be.true;
    });
  });
  
  describe('setChime', () => {
    it('should set chime setting', () => {
      actions.setChime(store, "coins");
      expect(getters.getChime(store.state)).to.equal("coins");
      
      const settings = settingsStorage.load();
      expect(settings.chime).to.equal("coins");
    });
  });
  
  describe('setStatsWindow', () => {
    it('should set stats window setting', () => {
      actions.setStatsWindow(store, 28);
      expect(getters.getStatsWindow(store.state)).to.equal(28);

      const settings = settingsStorage.load();
      expect(settings.stats_window).to.equal(28);
    });
  });
  
  describe('hydrateSettings', () => {
    it('should hydrate setting', () => {
      settingsStorage.add({ stats_window: 28 });
      settingsStorage.add({ chime: "coins" });
      settingsStorage.add({ play_chime: true });

      actions.hydrateSettings(store);
      
      expect(getters.getChime(store.state)).to.equal("coins");
      expect(getters.getPlayChime(store.state)).to.be.true;
      expect(getters.getStatsWindow(store.state)).to.equal(28);
    });
  });
});