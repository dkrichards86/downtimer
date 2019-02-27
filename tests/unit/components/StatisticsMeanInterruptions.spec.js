import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import * as chai from 'chai';
import sinonChai from 'sinon-chai';
import StatisticsMeanInterruptions from '@/components/StatisticsMeanInterruptions';

const { expect } = chai;
chai.use(sinonChai);

const localVue = createLocalVue();
localVue.use(Vuetify);

describe('StatisticsMeanInterruptions.vue', () => {
  let wrapper;
  let propsData;

  beforeEach(() => {

    propsData = {
      stops: {
        "Jan 6": {count: 0, duration: 0},
        "Jan 7": {count: 0, duration: 0},
        "Jan 8": {count: 1, duration: 0},
        "Jan 9": {count: 2, duration: 0},
        "Jan 10": {count: 3, duration: 0},
        "Jan 11": {count: 2, duration: 0},
        "Jan 12": {count: 1, duration: 0},
        "Jan 13": {count: 0, duration: 0},
        "Jan 14": {count: 0, duration: 0},
        "Jan 15": {count: 1, duration: 0},
        "Jan 16": {count: 1, duration: 0},
        "Jan 17": {count: 2, duration: 0},
        "Jan 18": {count: 1, duration: 0},
        "Jan 19": {count: 1, duration: 0},
      },
      days: [
        "Jan 6", "Jan 7", "Jan 8", "Jan 9", "Jan 10", "Jan 11", "Jan 12",
        "Jan 13", "Jan 14", "Jan 15", "Jan 16", "Jan 17", "Jan 18", "Jan 19"
      ]
    };

    wrapper = shallowMount(StatisticsMeanInterruptions, { localVue, propsData });
  });

  describe('behavior', () => {
    it('should set data', () => {
      const days = wrapper.vm.setData();
      expect(days).to.eql([0, 1, 1.5, 2.5, 1.5, 1, 0]);
    });
  });
});
