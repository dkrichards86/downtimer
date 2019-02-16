import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import Router from 'vue-router';
import { state, actions, getters } from '../__mocks__/store';

import * as chai from 'chai';
import sinonChai from 'sinon-chai';
import Wrapper from '@/layouts/Wrapper';
import WrapperSidebar from '@/components/WrapperSidebar';

const { expect } = chai;
chai.use(sinonChai);

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuetify);
localVue.use(Router);

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

    it('should render a Sidebar', () => {
      expect(wrapper.contains(WrapperSidebar)).to.equal(true);
    });

    it('should render a v-content', () => {
      expect(wrapper.contains('v-content-stub')).to.equal(true);
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
