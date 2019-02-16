import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import * as chai from 'chai';
import sinonChai from 'sinon-chai';
import WrapperSidebarTimerList from '@/components/WrapperSidebarTimerList';
import WrapperSidebarTimerListItem from '@/components/WrapperSidebarTimerListItem';
import { state, actions, getters } from '../__mocks__/store';

const { expect } = chai;
chai.use(sinonChai);

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuetify);

describe('StatisticsCard.vue', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store({
      state, getters, actions
    });

    wrapper = shallowMount(WrapperSidebarTimerList, { localVue, store });
  });

  describe('rendering', () => {
    it('should be v-list-group', () => {
      expect(wrapper.is('v-list-group-stub')).to.equal(true);
    });

    it('should display one timer-list-item for each timer in store', () => {
      expect(wrapper.findAll(WrapperSidebarTimerListItem).length).to.equal(2);
    });
  });
});
