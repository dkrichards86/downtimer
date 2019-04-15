/**
 * Zero pad a string to a specified length.
 *
 * @param {number} num: number to pad
 */
export const zeroPad = (num, length = 2) => num.toString().padStart(length, '0');


/**
 * Round milliseconds down to the nearest second
 *
 * @param {number} millis: milliseconds to round
 */
export const roundTime = millis => Math.floor(millis / 1000);

/**
 * Format seconds into mm:ss with optional hour.
 *
 * @param {number} secs: seconds to format
 */
export const timeFormat = (secs) => {
  const hours = Math.floor(secs / 3600);
  const minutes = Math.floor((secs % 3600) / 60);
  const seconds = Math.floor(secs % 3600 % 60);

  const components = [];

  // Conditionally add hours. We don't want hours unless they actually exist.
  if (hours > 0) {
    components.push(zeroPad(hours));
  }

  components.push(zeroPad(minutes), zeroPad(seconds));

  return components.join(':');
};

/**
 * Strip Vuex's reactivity elements from an array of timers
 *
 * @param {Object} timers: timers to parse
 */
export const extractTimers = timers => timers.map(t => ({
  duration: t.duration,
  title: t.title,
  uid: t.uid,
}));

/**
 * Round a number to a specified length
 *
 * @param {number} value: number to round
 * @param {decimals} value: length to round
 */
export const rounder = (value, decimals = 2) => {
  return Number(`${Math.round(`${value}e${decimals}`)}e-${decimals}`);
};
