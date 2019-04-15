import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import * as chai from 'chai';
import sinonChai from 'sinon-chai';
import StatisticsChart from '@/components/StatisticsChart';
import { state, actions, getters } from '../__mocks__/store';
import { stats } from '../__mocks__/stats';

const { expect } = chai;
chai.use(sinonChai);

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuetify); 

describe('StatisticsChart.vue', () => {
  let store;
  let wrapper;
  let propsData;

  beforeEach(() => {
    store = new Vuex.Store({
      state, getters, actions
    });
    
    propsData = { stats };

    wrapper = shallowMount(StatisticsChart, { localVue, store, propsData });
  });

  describe('behavior', () => {
    it('should set data', () => {
      const { starts, completions } = wrapper.vm.setData();
      expect(starts[0].y).to.equal(0);
      expect(completions[0].y).to.equal(0);
    });
    
    it('should watch stats', () => {
      wrapper.setProps({stats: {}});

      return wrapper.vm.$nextTick = () => {
        const { starts, completions } = wrapper.vm.setData();
        expect(starts[0].y).to.equal(0);
        expect(completions[0].y).to.equal(0);
      };
    });
  });
});
