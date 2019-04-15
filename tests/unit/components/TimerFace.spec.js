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
  
  describe('behavior', () => {
    it('should change a timer', () => {
      const newDuration = {
        uid: 'baz',
        title: "new duration",
        duration: 2000
      };
  
      wrapper.vm.changeTimer(newDuration);
      return wrapper.vm.$nextTick = () => {
        expect(wrapper.vm.progress).to.equal(0);
        expect(wrapper.vm.duration).to.deep.equal(newDuration);
      };
    });
    
    it('should change a timer value', () => {
      wrapper.vm.changeTimerValue(300);
      return wrapper.vm.$nextTick = () => {
        expect(wrapper.vm.coundown).to.equal(300);
        expect(wrapper.vm.progess).to.equal(80);
      };
    });
    
    it('should set progress', () => {
      wrapper.vm.setProgress(0.3);
      return wrapper.vm.$nextTick = () => {
        expect(wrapper.vm.progess).to.equal(30);
      };
    });
    
    it('should set duration', () => {
      const newDuration = {
        uid: 'baz',
        title: "new duration",
        duration: 2000
      };
      
      wrapper.vm.setDuration(newDuration);
      return wrapper.vm.$nextTick = () => {
        expect(wrapper.vm.duration).to.deep.equal(newDuration);
      };
    });
    
    it('should set countdown', () => {
      wrapper.vm.setCountdown(300);
      return wrapper.vm.$nextTick = () => {
        expect(wrapper.vm.coundown).to.equal(300);
      };
    });
  });
});
