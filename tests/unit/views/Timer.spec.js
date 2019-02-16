import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import * as chai from 'chai';
import sinonChai from 'sinon-chai';
import Timer from '@/views/Timer';
import TimerFace from '@/components/TimerFace';
import TimerControls from '@/components/TimerControls';
import { state, actions, getters } from '../__mocks__/store';
import { AlertChime, NativeNotification } from '../__mocks__/plugins';

const { expect } = chai;
chai.use(sinonChai);

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuetify);
localVue.use(AlertChime);
localVue.use(NativeNotification);

describe('Timer.vue', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store({
      state, getters, actions
    });

    wrapper = shallowMount(Timer, { localVue, store });
  });

  describe('rendering', () => {
    it('section should v-card', () => {
      expect(wrapper.is('v-card-stub')).to.equal(true);
    });

    it('should render a header', () => {
      expect(wrapper.contains('v-card-title-stub')).to.equal(true);
    });

    it('should render a timer face', () => {
      expect(wrapper.contains(TimerFace)).to.equal(true);
    });
    
    it('should render timer controls', () => {
      expect(wrapper.contains(TimerControls)).to.equal(true);
    });
  });
});
