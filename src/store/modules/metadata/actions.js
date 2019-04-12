import shortid from 'shortid';

import {
  SET_DEVICE_ID
} from './mutation_types';

import { Storage } from '../../../utils/storage';

const metadataStorage = new Storage('metadata');

export const actions = {
  setDeviceId(store, payload) {
    store.commit(SET_DEVICE_ID, payload);

    metadataStorage.add({ device_id: payload });
  },
  hydrate(store) {
    store.dispatch('hydrateTimers');
    store.dispatch('hydrateSettings');
    store.dispatch('hydrateMetadata');
  },
  hydrateMetadata(store) {
    const metadata = metadataStorage.load();

    if (metadata && 'device_id' in metadata) {
      store.commit(SET_DEVICE_ID, metadata.device_id);
    } else {
      store.dispatch('setDeviceId', shortid.generate());
    }
  }
};
