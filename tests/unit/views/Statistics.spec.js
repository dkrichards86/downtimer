import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import * as chai from 'chai';
import sinonChai from 'sinon-chai';
import Statistics from '@/views/Statistics';
import StatisticsControls from '@/components/StatisticsControls';
import StatisticsChart from '@/components/StatisticsChart';
import { state, actions, getters } from '../__mocks__/store';

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
    it('should be v-container', () => {
      expect(wrapper.is('v-card-stub')).to.equal(true);
    });
    
    it('should display statistics controls in v-card-text', () => {
      expect(wrapper.findAll(StatisticsControls).length).to.equal(1);
    });
    
    it('should display statistics chart in v-card-text', () => {
      expect(wrapper.findAll(StatisticsChart).length).to.equal(1);
    });
  });
});
