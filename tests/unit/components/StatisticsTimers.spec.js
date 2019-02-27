import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import * as chai from 'chai';
import sinonChai from 'sinon-chai';
import StatisticsTimers from '@/components/StatisticsTimers';

const { expect } = chai;
chai.use(sinonChai);

const localVue = createLocalVue();
localVue.use(Vuetify);

describe('StatisticsTimers.vue', () => {
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
      }
    };

    wrapper = shallowMount(StatisticsTimers, { localVue, propsData });
  });

  describe('behavior', () => {
    it('should set data', () => {
      const {starts, completions} = wrapper.vm.setData();

      expect(starts).to.deep.eql([
        {x: "Jan 6", y: 0},
        {x: "Jan 7", y: 0},
        {x: "Jan 8", y: 100},
        {x: "Jan 9", y: 200},
        {x: "Jan 10", y: 300},
        {x: "Jan 11", y: 200},
        {x: "Jan 12", y: 100}
      ]);
      
      expect(completions).to.deep.eql([
        {x: "Jan 6", y: 0},
        {x: "Jan 7", y: 0},
        {x: "Jan 8", y: 100},
        {x: "Jan 9", y: 200},
        {x: "Jan 10", y: 210},
        {x: "Jan 11", y: 120},
        {x: "Jan 12", y: 80}
      ]);
    });
  });
});
