import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import Router from 'vue-router';
import * as chai from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import TimerForm from '@/views/TimerForm';
import { state, actions, getters } from '../__mocks__/store';

const { expect } = chai;
chai.use(sinonChai);

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuetify);
localVue.use(Router);
const router = new Router();

describe('TimerForm.vue', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store({
      state, getters, actions
    });

    wrapper = shallowMount(TimerForm, { localVue, router, store });
  });

  describe('rendering', () => {
    it('should render a card', () => {
      expect(wrapper.contains('v-card-stub')).to.equal(true);
    });

    it('should render a card title', () => {
      const title = wrapper.find('v-card-title-stub');
      expect(title.text().trim()).to.equal("New Timer");
    });

    it('should render a title input', () => {
      expect(wrapper.contains('v-text-field-stub')).to.equal(true);
    });

    it('should render a time selects', () => {
      expect(wrapper.findAll('v-slider-stub').length).to.equal(2);
    });

    it('should always render 2 footer buttons', () => {
      const footer = wrapper.find('v-card-actions-stub');
      expect(footer.findAll('v-btn-stub').length).to.equal(2);
    });
    
    it('should conditionally render 3 footer buttons', () => {
      wrapper.setData({isEdit: true});
      
      return wrapper.vm.$nextTick = () => {
        const footer = wrapper.find('v-card-actions-stub');
        expect(footer.findAll('v-btn-stub').length).to.equal(3);
      };
    });
  });

  describe('behavior', () => {
    it('getMinSec should parse seconds into minutes and seconds', () => {
      wrapper.vm.getMinSec(125);

      return wrapper.vm.$nextTick = () => {
        expect(wrapper.vm.minutes).to.equal(2);
        expect(wrapper.vm.seconds).to.equal(5);
      };
    });

    it('saveItem should fire action', () => {
      wrapper.vm.saveItem();

      return wrapper.vm.$nextTick = () => {
        expect(actions.updateDuration).to.be.called();
      };
    });
    
    it('should set initial timer data (new)', () => {
      wrapper.vm.getMinSec = sinon.stub();

      wrapper.vm.setTimer();
      return wrapper.vm.$nextTick = () => {
        expect(wrapper.vm.headline).to.equal('New Timer');
        expect(wrapper.vm.isEdit).to.be.false;
        expect(wrapper.vm.title).to.equal('New Timer');
        expect(wrapper.vm.getMinSec).to.be.called();
      };
    });
    
    it('should set initial timer data (edit)', () => {
      wrapper.vm.getMinSec = sinon.stub();

      wrapper.vm.setTimer('foo');
      
      return wrapper.vm.$nextTick = () => {
        expect(wrapper.vm.headline).to.equal('Edit Timer');
        expect(wrapper.vm.isEdit).to.be.true;
        expect(wrapper.vm.editId).to.equal('foo');
        expect(wrapper.vm.title).to.equal('test timer');
        expect(wrapper.vm.getMinSec).to.be.called();
      };
    });
    
    it('should validate a timer, raising errors as required', () => {
      expect(wrapper.vm.timerError).to.be.null;
      wrapper.vm.validateTimer(0, 0);

      return wrapper.vm.$nextTick = () => {
        expect(wrapper.vm.timerError).to.not.be.null;
      };
    });
  });
});
