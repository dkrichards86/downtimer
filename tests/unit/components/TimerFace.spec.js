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
  let propsData;

  beforeEach(() => {
    store = new Vuex.Store({
      state, getters, actions
    });
    
    propsData = {
      progress: 50,
      duration: 10
    };

    wrapper = shallowMount(TimerFace, { localVue, store, propsData });
  });

  describe('rendering', () => {
    it('section should be a div', () => {
      expect(wrapper.is('div')).to.equal(true);
    });

    it('should render a timer face', () => {
      expect(wrapper.contains('.timer-face')).to.equal(true);
    });

    it('should render a progress bar', () => {
      expect(wrapper.contains('v-progress-linear-stub')).to.equal(true);
    });
  });
});
