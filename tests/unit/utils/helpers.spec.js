import { timeFormat, roundTime } from '@/utils/helpers';
import { expect } from 'chai';

describe('utils/helpers', () => {
  describe('timeFormat', () => {
    it('should format time', () => {
      const tf = timeFormat(125);
      expect(tf).to.equal('02:05');
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
});
