import Vuex from 'vuex';
import { expect } from 'chai';
import { actions as metadataActions } from '@/store/modules/metadata/actions';
import { actions as settingsActions } from '@/store/modules/settings/actions';
import { actions as timerActions } from '@/store/modules/timers/actions';
import { mutations } from '@/store/modules/metadata/mutations';
import { state, getters } from '../../../__mocks__/store';
import { Storage } from '@/utils/storage';

import cloneDeep from 'lodash/cloneDeep';

const timerStorage = new Storage('timers');
const settingsStorage = new Storage('settings');
const metadataStorage = new Storage('metadata');

describe('store/modules/metadata/actions.js', () => {
  let store;
  let actions;

  beforeEach(() => {
    actions = Object.assign({}, metadataActions, settingsActions, timerActions);
    
    store = new Vuex.Store({
      state: cloneDeep(state), getters, actions, mutations
    });
  });
  
  afterEach(() => {
    metadataStorage.clear();
    timerStorage.clear();
    settingsStorage.clear();
  });

  describe('setDeviceId', () => {
    it('should set device ID', () => {
      actions.setDeviceId(store, "foobarbaz");
      expect(getters.getDeviceId(store.state)).to.equal("foobarbaz");
      
      const metadata = metadataStorage.load();
      expect(metadata.device_id).to.equal("foobarbaz");
    });
  });
  
  describe('hydrateMetadata', () => {
    it('should hydrate metadata', () => {
      metadataStorage.add({ device_id: "foobarbaz" });
      actions.hydrateMetadata(store);
      
      expect(getters.getDeviceId(store.state)).to.equal("foobarbaz");
    });
    
    it('should hydrate metadata with default fallback', () => {
      actions.hydrateMetadata(store);
      
      expect(getters.getDeviceId(store.state)).to.not.be.null;
    });
  });
  
  // describe('hydrate', () => {
  //   it('should hydrate store', () => {
  //     const addedTimer = [{
  //       uid: 'baz',
  //       title: "test timer",
  //       duration: 2400
  //     }];
      
  //     timerStorage.save(addedTimer);

  //     settingsStorage.add({ stats_window: 28 });
  //     settingsStorage.add({ chime: "coins" });
  //     settingsStorage.add({ play_chime: true });

  //     metadataStorage.add({ device_id: "foobarbaz" });

  //     actions.hydrate(store);

  //     const timers = getters.getTimers(store.state);
  //     expect(timers).to.deep.equal(addedTimer);
  //     expect(timers.length).to.equal(1);

  //     expect(getters.getChime(store.state)).to.equal("coins");
  //     expect(getters.getPlayChime(store.state)).to.be.true;
  //     expect(getters.getStatsWindow(store.state)).to.equal(28);
      
  //     expect(getters.getDeviceId(store.state)).to.equal("foobarbaz");
  //   });
  // });
});