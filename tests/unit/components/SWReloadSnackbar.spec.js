import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import * as chai from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import SWReloadSnackbar from '@/components/SWReloadSnackbar';

const { expect } = chai;
chai.use(sinonChai);

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Vuetify);

describe('SWReloadSnackbar.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(SWReloadSnackbar, { localVue });
  });

  describe('rendering', () => {
    it('section should be a v-snackbar', () => {
      expect(wrapper.is('v-snackbar-stub')).to.equal(true);
    });
    
    it('should render a v-btn', () => {
      expect(wrapper.contains('v-btn-stub')).to.equal(true);
    });
  });
  
  describe('behavior', () => { 
    it('should refresh on click', () => {
      wrapper.vm.refresh = sinon.stub();
       
      const btn = wrapper.find('v-btn-stub');
      btn.trigger('click');

      return wrapper.vm.$nextTick = () => {
        expect(wrapper.vm.refresh).to.be.called();
      };
    });
  });
});
