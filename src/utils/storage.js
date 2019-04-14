// Simple localStorage polyfill. We don't expect this to be used outside of testing
/* istanbul ignore next */
if (!('localStorage' in window)) {
  window.localStorage = {
    _data: {},
    setItem: (id, val) => {
      this._data[id] = String(val);
    },
    getItem: (id) => {
      return id in this._data ? this._data[id] : undefined;
    },
    removeItem: (id) => {
      delete this._data[id];
    },
    clear: () => {
      this._data = {};
    }
  };
}

const STORAGE_PREFIX = 'downtimer_storage';

export class Storage {
  constructor(prefix) {
    this.storageKey = `${STORAGE_PREFIX}_${prefix}`;
  }

  key() {
    return this.storageKey;
  }

  load() {
    const storedData = window.localStorage.getItem(this.storageKey);

    if (storedData) {
      return JSON.parse(storedData);
    }

    return null;
  }

  save(data) {
    window.localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  add(newData) {
    const currData = this.load() || {};
    const data = Object.assign(currData, newData);

    this.save(data);
  }

  clear() {
    window.localStorage.removeItem(this.storageKey);
  }
}
