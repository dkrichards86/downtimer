import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import * as chai from 'chai';
import sinonChai from 'sinon-chai';
import TimerControls from '@/components/TimerControls';
import { state, actions, getters } from '../__mocks__/store';

const { expect } = chai;
chai.use(sinonChai);

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuetify);

describe('Timer.vue', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store({
      state, getters, actions
    });

    wrapper = shallowMount(TimerControls, { localVue, store });
  });

  describe('rendering', () => {
    it('should render actions', () => {
      expect(wrapper.contains('v-card-actions-stub')).to.equal(true);
    });

    it('should render 2 footer buttons', () => {
      const footer = wrapper.find('v-card-actions-stub');
      expect(footer.findAll('v-btn-stub').length).to.equal(2);
    });

    it('should render a start button when stopped', () => {
      wrapper.vm.status = -1;
      const footer = wrapper.find('v-card-actions-stub');
      const resetButton = footer.findAll('v-btn-stub').at(0);
      const buttonSpan = resetButton.find('span');
      expect(buttonSpan.text().trim()).to.equal('Start');
    });

    it('should render a start button when expired', () => {
      wrapper.vm.status = 2;
      return wrapper.vm.$nextTick = () => {
        const footer = wrapper.find('v-card-actions-stub');
        const resetButton = footer.findAll('v-btn-stub').at(0);
        const buttonSpan = resetButton.find('span');
        expect(buttonSpan.text().trim()).to.equal('Start');
      };
    });

    it('should render a resume button when paused', () => {
      wrapper.vm.status = 0;
      return wrapper.vm.$nextTick = () => {
        const footer = wrapper.find('v-card-actions-stub');
        const resetButton = footer.findAll('v-btn-stub').at(0);
        const buttonSpan = resetButton.find('span');
        expect(buttonSpan.text().trim()).to.equal('Resume');
      };
    });

    it('should render a pause button when playing', () => {
      wrapper.vm.status = 1;
      return wrapper.vm.$nextTick = () => {
        const footer = wrapper.find('v-card-actions-stub');
        const resetButton = footer.findAll('v-btn-stub').at(0);
        const buttonSpan = resetButton.find('span');
        expect(buttonSpan.text().trim()).to.equal('Pause');
      };
    });

    it('should render a reset buttons', () => {
      const footer = wrapper.find('v-card-actions-stub');
      const resetButton = footer.findAll('v-btn-stub').at(1);
      const buttonSpan = resetButton.find('span');
      expect(buttonSpan.text().trim()).to.equal('Reset');
    });
  });
});
