import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import * as chai from 'chai';
import sinonChai from 'sinon-chai';
import WrapperSidebar from '@/components/WrapperSidebar';

const { expect } = chai;
chai.use(sinonChai);

const localVue = createLocalVue();
localVue.use(Vuetify);

describe('WrapperSidebar.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(WrapperSidebar, { localVue });
  });

  describe('rendering', () => {
    it('should be v-navigation-drawer', () => {
      expect(wrapper.is('v-navigation-drawer-stub')).to.equal(true);
    });
    
     it('should render v-list', () => {
      expect(wrapper.contains('v-list-stub')).to.equal(true);
    });
    
    it('should display list items', () => {
      expect(wrapper.findAll('v-list-tile-stub').length).to.equal(7);
    });

    it('should display a list group for timers', () => {
      expect(wrapper.findAll('v-list-group-stub').length).to.equal(1);
    });

  });
});
