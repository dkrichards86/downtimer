const STORAGE_PREFIX = 'downtimer_storage';

/**
 * Load settings from local storage
 */
export const loadSettings = () => {
  const storedData = localStorage.getItem(`${STORAGE_PREFIX}_settings`);

  if (storedData) {
    return JSON.parse(storedData);
  }

  return null;
};

/**
 * Save settings to storage.
 */
export const saveSettings = (newSettings) => {
  const currSettings = loadSettings() || {};
  const settings = Object.assign(currSettings, newSettings);

  localStorage.setItem(`${STORAGE_PREFIX}_settings`, JSON.stringify(settings));
};

/**
 * Strip Vue reactivity elements from a timer prior to loading into storage.
 */
export const extractTimers = timers => timers.map(t => ({
  duration: t.duration,
  title: t.title,
  uid: t.uid
}));

/**
 * Load timers from local storage
 */
export const loadTimers = () => {
  const storedData = localStorage.getItem(`${STORAGE_PREFIX}_timers`);

  if (storedData) {
    return JSON.parse(storedData);
  }

  return null;
};

/**
 * Save timers to storage.
 */
export const saveTimers = (timers) => {
  localStorage.setItem(`${STORAGE_PREFIX}_timers`, JSON.stringify(timers));
};


/**
 * Load history from local storage
 */
export const loadHistory = () => {
  const storedData = localStorage.getItem(`${STORAGE_PREFIX}_history`);

  if (storedData) {
    return JSON.parse(storedData);
  }

  return null;
};

/**
 * Save history to storage.
 */
export const saveHistory = (history) => {
  localStorage.setItem(`${STORAGE_PREFIX}_history`, JSON.stringify(history));
};
