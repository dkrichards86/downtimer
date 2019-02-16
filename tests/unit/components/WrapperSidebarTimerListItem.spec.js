import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import Router from 'vue-router';
import * as chai from 'chai';
import sinonChai from 'sinon-chai';
import WrapperSidebarTimerListItem from '@/components/WrapperSidebarTimerListItem';
import { state, actions, getters } from '../__mocks__/store';
import { timeFormat } from '@/utils/helpers';

const { expect } = chai;
chai.use(sinonChai);

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuetify);
localVue.use(Router);

describe('WrapperSidebarTimerListItem.vue', () => {
  let store;
  let propsData;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store({
      state, getters, actions
    });

    propsData = {
      timer: {
        uid: 'foo',
        title: "test timer",
        duration: 1500
      }
    };

    wrapper = shallowMount(WrapperSidebarTimerListItem, { localVue, store, propsData });
  });

  describe('rendering', () => {
    it('should be a v-list-tile', () => {
      expect(wrapper.is('v-list-tile-stub')).to.equal(true);
    });

    it('should render a title', () => {
      expect(wrapper.contains('v-list-tile-title-stub')).to.equal(true);

      const title = wrapper.find('v-list-tile-title-stub');
      const expectedTitle = `${propsData.timer.title} (${timeFormat(propsData.timer.duration)})`;
      expect(title.text().trim()).to.equal(expectedTitle);
    });

    it('should render an edit action icon', () => {
      expect(wrapper.contains('v-list-tile-action-stub')).to.equal(true);
    });
  });
});
