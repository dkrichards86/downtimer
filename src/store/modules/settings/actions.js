import {
  SET_AUTOPLAY,
  SET_CYCLE,
  SET_PLAY_CHIME,
  SET_CHIME,
  SHOW_STATS_INTERRUPTIONS,
  SET_STATS_WINDOW
} from './mutation_types';

import {
  loadSettings,
  saveSettings
} from '../../../utils/storage';

export const actions = {
  setAutoplay(store, payload) {
    store.commit(SET_AUTOPLAY, payload);

    saveSettings({ autoplay: payload });
  },
  setCycle(store, payload) {
    store.commit(SET_CYCLE, payload);

    saveSettings({ cycle: payload });
  },
  setPlayChime(store, payload) {
    store.commit(SET_PLAY_CHIME, payload);

    saveSettings({ play_chime: payload });
  },
  setChime(store, payload) {
    store.commit(SET_CHIME, payload);

    saveSettings({ chime: payload });
  },
  setStatsInterruptions(store, payload) {
    store.commit(SHOW_STATS_INTERRUPTIONS, payload);

    saveSettings({ stats_interruptions: payload });
  },
  setStatsWindow(store, payload) {
    store.commit(SET_STATS_WINDOW, payload);

    saveSettings({ stats_window: payload });
  },
  hydrateSettings(store) {
    const settings = loadSettings();

    if (settings) {
      if ('autoplay' in settings) {
        store.commit(SET_AUTOPLAY, settings.autoplay);
      }

      if ('cycle' in settings) {
        store.commit(SET_CYCLE, settings.cycle);
      }

      if ('play_chime' in settings) {
        store.commit(SET_PLAY_CHIME, settings.play_chime);
      }

      if ('chime' in settings) {
        store.commit(SET_CHIME, settings.chime);
      }

      if ('stats_interruptions' in settings) {
        store.commit(SHOW_STATS_INTERRUPTIONS, settings.stats_interruptions);
      }

      if ('stats_window' in settings) {
        store.commit(SET_STATS_WINDOW, settings.stats_window);
      }
    }
  }
};
