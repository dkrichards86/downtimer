import moment from 'moment';

/**
 * Round milliseconds down to the nearest second
 *
 * @param {number} millis: milliseconds to round
 */
export const roundTime = millis => Math.floor(millis / 1000);

/**
 * Format seconds into mm:ss
 *
 * @param {number} secs: seconds to format
 */
export const timeFormat = secs => moment(secs * 1000).format('mm:ss');

export const zeroPad = (num) => `0${num}`.slice(-2);

export const secToHHMMSS = (secs) => {
  const hours = Math.floor(secs / 3600);
  const minutes = Math.floor((secs % 3600) / 60);
  const seconds = Math.floor(secs % 3600 % 60);
  const hourString = hours > 0 ? `${zeroPad(hours)}:` : '';

  return `${hourString}${zeroPad(minutes)}:${zeroPad(seconds)}`;
};
