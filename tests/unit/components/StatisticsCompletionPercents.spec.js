import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import * as chai from 'chai';
import sinonChai from 'sinon-chai';
import StatisticsCompletionPercents from '@/components/StatisticsCompletionPercents';

const { expect } = chai;
chai.use(sinonChai);

const localVue = createLocalVue();
localVue.use(Vuetify);

describe('StatisticsCompletionPercents.vue', () => {
  let wrapper;
  let propsData;

  beforeEach(() => {

    propsData = {
      starts: {
        "Jan 6": {count: 0, duration: 0},
        "Jan 7": {count: 0, duration: 0},
        "Jan 8": {count: 1, duration: 100},
        "Jan 9": {count: 2, duration: 200},
        "Jan 10": {count: 3, duration: 300},
        "Jan 11": {count: 2, duration: 200},
        "Jan 12": {count: 1, duration: 100},
      },
      completions: {
        "Jan 6": {count: 0, duration: 0},
        "Jan 7": {count: 0, duration: 0},
        "Jan 8": {count: 1, duration: 100},
        "Jan 9": {count: 2, duration: 200},
        "Jan 10": {count: 1, duration: 210},
        "Jan 11": {count: 1, duration: 120},
        "Jan 12": {count: 0, duration: 80}
      },
      days: [
        "Jan 6", "Jan 7", "Jan 8", "Jan 9", "Jan 10", "Jan 11", "Jan 12"
      ]
    };

    wrapper = shallowMount(StatisticsCompletionPercents, { localVue, propsData });
  });

  describe('behavior', () => {
    it('should set data', () => {
      const days = wrapper.vm.setData();

      expect(days).to.eql([0, 1, 1, .7, .6, .8, 0]);
    });
  });
});
