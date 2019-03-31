const STORAGE_PREFIX = 'downtimer_storage';

export class Storage {
  constructor(prefix) {
    this.storageKey = `${STORAGE_PREFIX}_${prefix}`;
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
}
