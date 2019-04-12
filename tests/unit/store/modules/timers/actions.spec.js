import Vuex from 'vuex';
import { expect } from 'chai';
import { actions } from '@/store/modules/timers/actions';
import { mutations } from '@/store/modules/timers/mutations';
import { state, getters } from '../../../__mocks__/store';
import { Storage } from '@/utils/storage';

import cloneDeep from 'lodash/cloneDeep';
import last from 'lodash/last';

const timerStorage = new Storage('timers');
const runStorage = new Storage('runs');
const eventStorage = new Storage('events');

describe('store/modules/timers/actions.js', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      state: cloneDeep(state), getters, actions, mutations
    });
  });
  
  afterEach(() => {
    timerStorage.clear();
    runStorage.clear();
    eventStorage.clear();
  });

  describe('setCurrentRunId', () => {
    it('should set a run ID', () => {
      actions.setCurrentRunId(store, "foobarbaz");
      expect(getters.getCurrentRunId(store.state)).to.equal("foobarbaz");
    });
  });
  
  describe('setActiveTimer', () => {
    it('should activate a timer', () => {
      actions.setActiveTimer(store, "bar");
      expect(getters.getActiveTimer(store.state)).to.equal("bar");
      const activeTimer = getters.getTimerById(store.state)("bar");
      expect(activeTimer.duration).to.equal(1200);
    });
  });
  
  describe('hydrateTimers', () => {
    it('should hydrate timers', () => {
       const addedTimer = [{
        uid: 'foo',
        title: "test timer",
        duration: 1500
      }];
      
      timerStorage.save(addedTimer);

      actions.hydrateTimers(store);
      
      const timers = getters.getTimers(store.state);
      expect(timers).to.deep.equal(addedTimer);
      expect(timers.length).to.equal(1);
    });
  });
  
  describe('removeTimer', () => {
    it('should remove a timer', () => {
      actions.removeTimer(store, "bar");
      expect(getters.getTimers(store.state).length).to.equal(1);
    });
  });
  
  describe('setTimers', () => {
    it('should bulk set timers', () => {
      const timers = [
        {
          uid: 'foo',
          title: "test timer",
          duration: 1500
        },
        {
          uid: 'bar',
          title: "test timer",
          duration: 1200
        },
        {
          uid: 'baz',
          title: "test timer",
          duration: 2400
        }
      ];
      
      actions.setTimers(store, timers);
      expect(getters.getTimers(store.state).length).to.equal(3);
      
      expect(timers[0].uid).to.equal("foo");
      expect(timers[0].duration).to.equal(1500);
      
      expect(timers[1].uid).to.equal("bar");
      expect(timers[1].duration).to.equal(1200);
      
      expect(timers[2].uid).to.equal("baz");
      expect(timers[2].duration).to.equal(2400);
    });
  });

  describe('updateTimers', () => {
    it('should edit an existing timer', () => {
      const newTimer = {
        uid: 'foo',
        title: "test timer",
        duration: 1800,
        editId: 'foo'
      };

      actions.updateTimers(store, newTimer);
      
      const timers = getters.getTimers(store.state);

      expect(timers.length).to.equal(2);

      expect(timers[0].uid).to.equal("foo");
      expect(timers[0].duration).to.equal(1800);
      
      expect(timers[1].uid).to.equal("bar");
      expect(timers[1].duration).to.equal(1200);
    });

    it('should add a new timer', () => {
      const newTimer = {
        uid: 'baz',
        title: "test timer",
        duration: 2400,
        editId: ''
      };

      actions.updateTimers(store, newTimer);
      
      const timers = getters.getTimers(store.state);
      
      expect(timers.length).to.equal(3);

      expect(timers[0].uid).to.equal("foo");
      expect(timers[0].duration).to.equal(1500);
      
      expect(timers[1].uid).to.equal("bar");
      expect(timers[1].duration).to.equal(1200);
      
      expect(timers[2].uid).to.equal("baz");
      expect(timers[2].duration).to.equal(2400);
    });
  });
  
  describe('setTimerStatus', () => {
    it('should update timer status', () => {
      actions.setTimerStatus(store, 2);
      expect(getters.getTimerStatus(store.state)).to.equal(2);
    });
  });
  
  describe('updateTimerValue', () => {
    it('should update timer value', () => {
      actions.updateTimerValue(store, 200);
      expect(getters.getTimerValue(store.state)).to.equal(200);
    });
  });
  
  describe('completeTimer', () => {
    it('should complete a timer', () => {
      // Need to set a run ID in order to log anything 
      actions.setCurrentRunId(store, "foobarbaz");
      
      actions.completeTimer(store);
      expect(getters.getTimerStatus(store.state)).to.equal(2);
      
      const events = eventStorage.load();
      expect(last(events).event).to.equal('expiry');
    });
  });
  
  describe('pauseTimer', () => {
    it('should complete a timer', () => {
      // Need to set a run ID in order to log anything 
      actions.setCurrentRunId(store, "foobarbaz");
      
      actions.pauseTimer(store);
      expect(getters.getTimerStatus(store.state)).to.equal(0);
      
      const events = eventStorage.load();
      expect(last(events).event).to.equal('pause');
    });
  });
  
  describe('resetTimer', () => {
    it('should reset a timer', () => {
      actions.initTimer(store);
      actions.startTimer(store);
      
      actions.resetTimer(store);
      expect(getters.getTimerStatus(store.state)).to.equal(3);
      expect(getters.getTimerValue(store.state)).to.equal(1500);
      
      const events = eventStorage.load();
      expect(last(events).event).to.equal('reset');
    });
  });
  
  describe('resumeTimer', () => {
    it('should resume a timer', () => {
      // Need to set a run ID in order to log anything 
      actions.setCurrentRunId(store, "foobarbaz");
      
      // action only runs on paused timers
      actions.setTimerStatus(store, 0);

      actions.resumeTimer(store);
      expect(getters.getTimerStatus(store.state)).to.equal(1);
      
      const events = eventStorage.load();
      expect(last(events).event).to.equal('resume');
    });
  });
  
  describe('startTimer', () => {
    it('should start a timer', () => {
       actions.initTimer(store);
       actions.startTimer(store);
       expect(getters.getTimerStatus(store.state)).to.equal(1);
       expect(getters.getCurrentRunId(store.state)).to.not.be.null;
       
       actions.resetTimer(store);
    });
  });
  
  // describe('setRating', () => {
  //   it('should rate a run', () => {});
  // });
});