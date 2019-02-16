import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import * as chai from 'chai';
import sinonChai from 'sinon-chai';
import NotFound from '@/views/NotFound';

const { expect } = chai;
chai.use(sinonChai);

const localVue = createLocalVue();
localVue.use(Vuetify);

describe('NotFound.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(NotFound, { localVue });
  });

  describe('rendering', () => {
    it('should be v-card', () => {
      expect(wrapper.is('v-card-stub')).to.equal(true);
    });

    it('should display a title', () => {
      const title = wrapper.find('v-card-title-stub');
      expect(title.text().trim()).to.equal('Page Not Found');
    });
    
    it('should display content in v-card-text', () => {
      expect(wrapper.findAll('v-card-text-stub').length).to.equal(1);
    });

    it('should display actions', () => {
      expect(wrapper.findAll('v-card-actions-stub').length).to.equal(1);
    });

  });
});
