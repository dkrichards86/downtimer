import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import * as chai from 'chai';
import sinonChai from 'sinon-chai';
import Settings from '@/views/Settings';
import { AlertChime } from '../__mocks__/plugins';
import { state, actions, getters } from '../__mocks__/store';

const { expect } = chai;
chai.use(sinonChai);

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuetify);
localVue.use(AlertChime);

describe('Settings.vue', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store({
      state, getters, actions
    });

    wrapper = shallowMount(Settings, { localVue, store });
  });

  describe('rendering', () => {
    it('should be v-card', () => {
      expect(wrapper.is('v-card-stub')).to.equal(true);
    });

    it('should display a settings title', () => {
      const title = wrapper.find('v-card-title-stub');
      expect(title.text().trim()).to.equal('Settings');
    });
    
    it('should display content in v-card-text', () => {
      expect(wrapper.findAll('v-card-text-stub').length).to.equal(1);
    });

    it('should display form components', () => {
      const content = wrapper.find('v-card-text-stub');
      expect(content.findAll('v-switch-stub').length).to.equal(1);
      expect(content.findAll('v-select-stub').length).to.equal(2);
    });

    // it('should disable chime select if playchime is false', () => {
    //   const chimeSelect = wrapper.findAll('v-select-stub')[1];
    //   expect(chimeSelect.attributes('disabled')).to.equal('true');
    // });
    
    // it('should not disable chime select if playchime is true', () => {
    //   const chimeSelect = wrapper.find('v-select-stub');
    //   wrapper.setData({playchime: true});

    //   return wrapper.vm.$nextTick = () => {
    //     expect(chimeSelect.attributes('disabled')).to.equal('false');
    //   };
    // });
  });

  describe('behavior', () => {
    it('should handle chime getter', () => {
      return wrapper.vm.$nextTick = () => {
        expect(actions.getChime).to.be.called();
        expect(actions.getChime).to.equal('coins');
      };
    });

    it('should handle chime setter', () => {
      wrapper.setData({chime: 'arpeggio'});

      return wrapper.vm.$nextTick = () => {
        expect(actions.setChime).to.be.called();
        expect(actions.getChime).to.equal('arpeggio');
      };
    });
    
    it('should handle playchime getter', () => {
      return wrapper.vm.$nextTick = () => {
        expect(actions.getPlayChime).to.be.called();
        expect(actions.getPlayChime()).to.be.false;
      };
    });

    it('should handle playchime setter', () => {
      wrapper.setData({playchime: true});

      return wrapper.vm.$nextTick = () => {
        expect(actions.setPlayChime).to.be.called();
        expect(actions.getPlayChime()).to.be.true;
      };
    });
  });
});
