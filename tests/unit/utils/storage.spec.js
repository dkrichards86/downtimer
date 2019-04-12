import { expect } from 'chai';
import { Storage } from '@/utils/storage';

describe('utils/storage', () => {
  let testStorage;
  let key;

  beforeEach(() => {
    testStorage = new Storage('test');
    key = testStorage.key();
  });
  
  afterEach(() => {
    testStorage.clear();
  });

  it('should build a prefixed key', () => {
    const STORAGE_PREFIX = 'downtimer_storage';
    
    expect(key).to.equal(`${STORAGE_PREFIX}_test`);
  });

  it('should load data from storage', () => {
    expect(testStorage.load()).to.be.null;
    
    window.localStorage.setItem(key, JSON.stringify(["foo"]));
    expect(testStorage.load()).to.deep.equal(["foo"]);
  });
  
  it('should save data to storage', () => {
    testStorage.save(["foo"]);
    
    expect( window.localStorage.getItem(key)).to.equal(JSON.stringify(["foo"])); 
  });
  
  it('should clear storage', () => {
    testStorage.save(["foo"]);
    testStorage.clear();
    expect(testStorage.load()).to.be.null;
  });
});
