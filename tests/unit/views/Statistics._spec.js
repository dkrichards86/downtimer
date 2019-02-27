import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import * as chai from 'chai';
import sinonChai from 'sinon-chai';
import Statistics from '@/views/Statistics';
import StatisticsTimers from '@/components/StatisticsTimers';
import StatisticsCompletionPercents from '@/components/StatisticsCompletionPercents';
import StatisticsDailyInterruptions from '@/components/StatisticsDailyInterruptions';
import StatisticsMeanInterruptions from '@/components/StatisticsMeanInterruptions';
import StatisticsControls from '@/components/StatisticsControls';

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
    
    it('should display timer statistics', () => {
      expect(wrapper.findAll(StatisticsTimers).length).to.equal(1);
    });
    
    it('should display completion stats', () => {
      expect(wrapper.findAll(StatisticsCompletionPercents).length).to.equal(1);
    });
    
    it('should display daily interuption stats', () => {
      expect(wrapper.findAll(StatisticsDailyInterruptions).length).to.equal(1);
    });
    
    it('should display average interruption stats', () => {
      expect(wrapper.findAll(StatisticsMeanInterruptions).length).to.equal(1);
    });
  });
});
