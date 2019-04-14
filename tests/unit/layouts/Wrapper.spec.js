import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import Router from 'vue-router';
import { state, actions, getters } from '../__mocks__/store';
import { AlertChime, NativeNotification } from '../__mocks__/plugins';

import * as chai from 'chai';
import sinonChai from 'sinon-chai';
import Wrapper from '@/layouts/Wrapper';
import WrapperSidebar from '@/components/WrapperSidebar';
import SWReloadSnackbar from '@/components/SWReloadSnackbar';
import TimerRatingSnackbar from '@/components/TimerRatingSnackbar';

const { expect } = chai;
chai.use(sinonChai);

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuetify);
localVue.use(Router);
localVue.use(AlertChime);
localVue.use(NativeNotification);

describe('Wrapper.vue', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store({
      state, getters, actions
    });

    wrapper = shallowMount(Wrapper, { localVue, store });
  });

  describe('rendering', () => {
    it('should be v-app', () => {
      expect(wrapper.is('v-app-stub')).to.equal(true);
    });

    it('should render v-toolbar', () => {
      expect(wrapper.contains('v-toolbar-stub')).to.equal(true);
    });
    
    it('should render v-navigation-drawer', () => {
      expect(wrapper.contains('v-navigation-drawer-stub')).to.equal(true);
    });

    it('should render a Sidebar', () => {
      expect(wrapper.contains(WrapperSidebar)).to.equal(true);
    });

    it('should render a v-content', () => {
      expect(wrapper.contains('v-content-stub')).to.equal(true);
    });
    
    it('should conditionally render a SWReloadSnackbar', () => {
      expect(wrapper.contains(SWReloadSnackbar)).to.equal(false);
      
      wrapper.setData({swUpdate: true});
      return wrapper.vm.$nextTick = () => {
        expect(wrapper.contains(SWReloadSnackbar)).to.equal(true);
      };
    });
    
    it('should conditionally render a TimerRatingSnackbar', () => {
      expect(wrapper.contains(TimerRatingSnackbar)).to.equal(false);
      
      wrapper.setData({showRating: true});
      return wrapper.vm.$nextTick = () => {
        expect(wrapper.contains(TimerRatingSnackbar)).to.equal(true);
      };
    });
  });

  describe('behavior', () => {
    it('should hydrateConfigs', () => {
      return wrapper.vm.$nextTick = () => {
        expect(actions.hydrateConfigs).to.be.called();
      };
    });
    
    it('should initTimer', () => {
      return wrapper.vm.$nextTick = () => {
        expect(actions.initTimer).to.be.called();
      };
    });
  });
});
