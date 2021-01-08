import * as helpers from './localstorageHelpers.js';
import { isBrowser } from './browserHelpers.js';
//https://medium.com/@qjli/how-to-mock-specific-module-function-in-jest-715e39a391f4
// localStorageAvailable.mockImplementation(() => true);

// let localStorageMock;
jest.mock('./browserHelpers.js');

describe('localstorageHelpers', () => {
  beforeEach(() => {
    // jest.resetAllMocks();
    // localStorageMock = {
    //   getItem: jest.fn(),
    //   setItem: jest.fn(),
    //   clear: jest.fn(),
    // };
    // global.localStorage = localStorageMock;

    isBrowser.mockImplementation(() => true);
  });

  // probably move this to a browserHelpers spec file.
  it('can tell when localStorage is not available', () => {
    isBrowser.mockImplementation(() => false);
    expect(isBrowser()).toBe(false);
  });

  it('can serialize notes from state object', () => {
    const notes = ['hello', 'there'];
    const state = { notes };
    const expectedResult = '["hello","there"]';
    expect(helpers.serializeNotes(state)).toEqual(expectedResult);
  });

  // it('can deserialize notes from string to array', () => {});
  it('can load and deserialize notes from localstorage', () => {
    isBrowser.mockImplementation(() => true);
    localStorage.getItem.mockImplementation(() => `["yes", "no"]`);
    const result = helpers.loadNotesFromLocalStorage();
    expect(localStorage.getItem).toHaveBeenCalled();
    expect(isBrowser).toHaveBeenCalled();
    expect(result).toEqual(['yes', 'no']);
  });

  // do we even want this behavior?
  it('returns empty array if localstorage unavailable', () => {
    isBrowser.mockReset();
    expect(helpers.loadNotesFromLocalStorage()).toEqual([]);
  });

  it('can save notes from state to localstorage', () => {
    const state = {
      notes: ['hello', 'hi'],
    };
    const expectedStoredValue = `["hello","hi"]`;
    helpers.saveNotesToLocalStorage(state);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      helpers.LOCALSTORAGE_KEY,
      expectedStoredValue
    );
  });
});
