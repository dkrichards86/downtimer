import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import * as chai from 'chai';
import sinonChai from 'sinon-chai';
import StatisticsControls from '@/components/StatisticsControls';
import { state, actions, getters } from '../__mocks__/store';

const { expect } = chai;
chai.use(sinonChai);

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuetify);

describe('StatisticsControls.vue', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store({
      state, getters, actions
    });

    wrapper = shallowMount(StatisticsControls, { localVue, store });
  });

  describe('rendering', () => {
    it('should be v-layout', () => {
      expect(wrapper.is('v-layout-stub')).to.equal(true);
    });
    
    it('should render a select field', () => {
      expect(wrapper.contains('v-select-stub')).to.equal(true);
    });
  });
});
