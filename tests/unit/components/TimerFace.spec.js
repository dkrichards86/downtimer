import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import * as chai from 'chai';
import sinonChai from 'sinon-chai';
import TimerFace from '@/components/TimerFace';
import { state, actions, getters } from '../__mocks__/store';

const { expect } = chai;
chai.use(sinonChai);

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuetify);

describe('TimerFace.vue', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store({
      state, getters, actions
    });

    wrapper = shallowMount(TimerFace, { localVue, store });
  });

  describe('rendering', () => {
    it('section should be a v-card', () => {
      expect(wrapper.is('v-card-stub')).to.equal(true);
    });
    
    it('should render a v-card-title', () => {
      expect(wrapper.contains('v-card-title-stub')).to.equal(true);
    });

    it('should render a timer face', () => {
      expect(wrapper.contains('.timer-face')).to.equal(true);
    });

    it('should render a progress bar', () => {
      expect(wrapper.contains('v-progress-linear-stub')).to.equal(true);
    });
  });
});
