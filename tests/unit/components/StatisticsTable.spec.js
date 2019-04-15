import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import * as chai from 'chai';
import sinonChai from 'sinon-chai';
import StatisticsTable from '@/components/StatisticsTable';
import { state, actions, getters } from '../__mocks__/store';
import { stats } from '../__mocks__/stats';

const { expect } = chai;
chai.use(sinonChai);

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuetify); 

describe('StatisticsTable.vue', () => {
  let store;
  let wrapper;
  let propsData;

  beforeEach(() => {
    store = new Vuex.Store({
      state, getters, actions
    });
    
    propsData = { stats };

    wrapper = shallowMount(StatisticsTable, { localVue, store, propsData });
  });

  describe('rendering', () => {
    it('section should be a v-data-table', () => {
      expect(wrapper.is('v-data-table-stub')).to.equal(true);
    });
  });
  
  describe('behavior', () => {
    it('should set correct per page array', () => {
      expect(wrapper.vm.perPage).to.deep.equal([7,14]);
    });
    
    it('should format time properly', () => {
      expect(wrapper.vm.timeFormat(1200)).to.equal('20:00');
    });
    
    it('should set data', () => {
      const expected = [
        {
          "completions": 0,
          "interruptions": 0,
          "name": "Sat Jan 6",
          "percentage": 0,
          "starts": 0,
        },
        {
          "completions": 0,
          "interruptions": 0,
          "name": "Sun Jan 7",
          "percentage": 0,
          "starts": 0,
        },
        {
          "completions": 100,
          "interruptions": 0,
          "name": "Mon Jan 8",
          "percentage": 1,
          "starts": 100,
        },
        {
          "completions": 200,
          "interruptions": 0,
          "name": "Tue Jan 9",
          "percentage": 1,
          "starts": 200,
        },
        {
          "completions": 210,
          "interruptions": 3,
          "name": "Wed Jan 10",
          "percentage": 0.7,
          "starts": 300,
        },
        {
          "completions": 120,
          "interruptions": 2,
          "name": "Thu Jan 11",
          "percentage": 0.6,
          "starts": 200,
        },
        {
          "completions": 80,
          "interruptions": 0,
          "name": "Fri Jan 12",
          "percentage": 0.8,
          "starts": 100,
        }
      ];
      expect(wrapper.vm.items).to.deep.equal(expected);
    });
    
    it('should watch stats', () => {
      wrapper.setProps({stats: {}});

      return wrapper.vm.$nextTick = () => {
        expect(wrapper.vm.items.length).to.equal(0);
      };
    });
  });
});
