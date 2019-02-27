import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import * as chai from 'chai';
import sinonChai from 'sinon-chai';
import StatisticsDailyInterruptions from '@/components/StatisticsDailyInterruptions';

const { expect } = chai;
chai.use(sinonChai);

const localVue = createLocalVue();
localVue.use(Vuetify);

describe('StatisticsDailyInterruptions.vue', () => {
  let wrapper;
  let propsData;

  beforeEach(() => {

    propsData = {
      interruptions: {
        "Jan 6": {count: 0, duration: 0},
        "Jan 7": {count: 0, duration: 0},
        "Jan 8": {count: 1, duration: 0},
        "Jan 9": {count: 2, duration: 0},
        "Jan 10": {count: 3, duration: 0},
        "Jan 11": {count: 2, duration: 0},
        "Jan 12": {count: 1, duration: 0}
      },
    };

    wrapper = shallowMount(StatisticsDailyInterruptions, { localVue, propsData });
  });

  describe('behavior', () => {
    it('should set data', () => {
      const days = wrapper.vm.setData();
      expect(days).to.deep.eql([
        {x: "Jan 6", y: 0},
        {x: "Jan 7", y: 0},
        {x: "Jan 8", y: 1},
        {x: "Jan 9", y: 2},
        {x: "Jan 10", y: 3},
        {x: "Jan 11", y: 2},
        {x: "Jan 12", y: 1}
      ]);
    });
  });
});
