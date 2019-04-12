import { timeFormat, roundTime, zeroPad, extractTimers } from '@/utils/helpers';
import { expect } from 'chai';

describe('utils/helpers', () => {
  describe('zeroPad', () => {
    it('should pad a number to two characters', () => {
      expect(zeroPad(3)).to.equal('03');
      expect(zeroPad(30)).to.equal('30');
      expect(zeroPad(300)).to.equal('300');
    });
  });
  
  describe('roundTime', () => {
    it('sectionround milliseconds down', () => {
      expect(roundTime(1000)).to.equal(1);
      expect(roundTime(1250)).to.equal(1);
      expect(roundTime(1500)).to.equal(1);
      expect(roundTime(1999)).to.equal(1);
    });
  });

  describe('timeFormat', () => {
    it('should format time', () => {
      expect(timeFormat(125)).to.equal('02:05');
      expect(timeFormat(1200)).to.equal('20:00');
      expect(timeFormat(3601)).to.equal('01:00:01');
    });
  });
  
  describe('extractTimers', () => {
    it('should format time', () => {
      const cleanTimers = [
        {
          uid: 'foo',
          title: "test timer",
          duration: 1500
        },
        {
          uid: 'bar',
          title: "test timer",
          duration: 1200
        }
      ];
      
      const dirtyTimers = [
        {
          uid: 'foo',
          foo: 'bar',
          title: "test timer",
          duration: 1500
        },
        {
          uid: 'bar',
          baz: "qux",
          title: "test timer",
          duration: 1200
        }
      ];

      expect(extractTimers(cleanTimers)).to.deep.equal(cleanTimers);
      expect(extractTimers(dirtyTimers)).to.deep.equal(cleanTimers);
    });
  });
});
