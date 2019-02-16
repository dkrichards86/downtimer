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
