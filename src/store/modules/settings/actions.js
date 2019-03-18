import {
  SET_AUTOPLAY,
  SET_CYCLE,
  SET_PLAY_CHIME,
  SET_CHIME,
  SET_STATS_WINDOW
} from './mutation_types';

import { Storage } from '../../../utils/storage';

const settingsStorage = new Storage('settings');

export const actions = {
  setAutoplay(store, payload) {
    store.commit(SET_AUTOPLAY, payload);

    settingsStorage.add({ autoplay: payload });
  },
  setCycle(store, payload) {
    store.commit(SET_CYCLE, payload);

    settingsStorage.add({ cycle: payload });
  },
  setPlayChime(store, payload) {
    store.commit(SET_PLAY_CHIME, payload);

    settingsStorage.add({ play_chime: payload });
  },
  setChime(store, payload) {
    store.commit(SET_CHIME, payload);

    settingsStorage.add({ chime: payload });
  },
  setStatsWindow(store, payload) {
    store.commit(SET_STATS_WINDOW, payload);

    settingsStorage.add({ stats_window: payload });
  },
  hydrateSettings(store) {
    const settings = settingsStorage.load();

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

      if ('stats_window' in settings) {
        store.commit(SET_STATS_WINDOW, settings.stats_window);
      }
    }
  }
};
