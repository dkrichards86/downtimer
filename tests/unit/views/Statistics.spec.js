import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import * as chai from 'chai';
import sinonChai from 'sinon-chai';
import Statistics from '@/views/Statistics';

import { state, actions, getters } from '../__mocks__/store';
import { runs as statsRuns, events as statsEvents } from '../__mocks__/stats';

const { expect } = chai;
chai.use(sinonChai);

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuetify);

describe('Statistics.vue', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store({
      state, getters, actions
    });

    wrapper = shallowMount(Statistics, { localVue, store });
  });

  describe('rendering', () => {
    it('should be a div', () => {
      expect(wrapper.is('div')).to.equal(true);
    });
  });
  
  describe('behavior', () => {
    it('should build skeleton data structursse', () => {
      const statsData = wrapper.vm.buildDataSkel();
      expect(Object.keys(statsData).length).to.equal(getters.getStatsWindow(store.state));
    });
    
    it('should load data from storage (empty storage)', () => {
      const { runs, events } = wrapper.vm.loadData();
      expect(runs).to.be.null;
      expect(events).to.be.null;
    });
    
    it('should unpack runs', () => {
      const expected = { '0ewp13X7Q': 1800 };
      expect(wrapper.vm.unpackRuns(statsRuns)).to.deep.equal(expected);
    });
    
    it('should group events', () => {
      const expected = {
        'Wed Apr 03 2019 00:00:00 GMT+0000': [ 
          {
            datetime: '1554312952',
            event: 'start',
            runId: '0ewp13X7Q',
            synced: false
          },
          {
            datetime: '1554314752',
            event: 'expiry',
            runId: '0ewp13X7Q',
            synced: false
          },
          { 
            datetime: '1554315197',
            event: 'exit',
            runId: '0ewp13X7Q',
            synced: false
          }
        ]
      };
      expect(wrapper.vm.getGroups(statsEvents)).to.deep.equal(expected);
    });
    
    it('should group events', () => {
      wrapper.vm.parseData(statsRuns, statsEvents);
      expect(Object.keys(wrapper.vm.stats).length).to.equal(getters.getStatsWindow(store.state));
    });
  });
});
