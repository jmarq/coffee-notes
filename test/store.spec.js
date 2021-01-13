// https://medium.com/@brandonaaskov/how-to-test-nuxt-stores-with-jest-9a5d55d54b28
import Vuex from 'vuex';
import { createLocalVue } from '@vue/test-utils';

// so this seems to let tests pass, but the import after the mock breaks my linting.
//  is there a preferred solution to this problem?
// hmm https://stackoverflow.com/questions/45006254/jest-mock-module-per-test
//  more https://stackoverflow.com/questions/48790927/how-to-change-mock-implementation-on-a-per-single-test-basis-jestjs/54361996#54361996
import {
  loadEntitiesFromLocalStorage,
  // saveEntitiesToLocalStorage,
  // saveNotesToLocalStorage,
  // loadNotesFromLocalStorage,
} from '../helpers/localstorageHelpers.js';

import { isBrowser } from '../helpers/browserHelpers.js';

jest.mock('../helpers/browserHelpers.js');
jest.mock('../helpers/localstorageHelpers.js');

describe('store test exploration', () => {
  // making a local vue rather than global
  const localVue = createLocalVue();
  // have the local vue use Vuex
  localVue.use(Vuex);
  let NuxtStore;
  let store;

  beforeAll(async () => {
    // note the store will mutate across tests
    // setup file builds store and puts it in this directory?
    const storePath = `${process.env.buildDir}/store.js`;
    // import it so we can use it in our tests
    NuxtStore = await import(storePath);
  });

  beforeEach(async () => {
    store = await NuxtStore.createStore();
    isBrowser.mockImplementation(() => true);
    jest.clearAllMocks();
  });

  it('defaults to initialLoadComplete == false', () => {
    expect(store.state.initialLoadComplete).toBe(false);
  });

  it('can set initialLoadComplete to true', () => {
    store.commit('markInitialLoadComplete');
    expect(store.state.initialLoadComplete).toBe(true);
  });

  it('can load and mark initial load complete if it hasnt been done already', async () => {
    store.commit('markInitialLoadIncomplete');
    await store.dispatch('performInitialLoad');
    expect(store.state.initialLoadComplete).toBe(true);
    expect(loadEntitiesFromLocalStorage).toHaveBeenCalled();
  });

  it('will not perform initial load if it is already marked as done', async () => {
    // loadNotesFromLocalStorage.mockClear();
    store.commit('markInitialLoadComplete');
    await store.dispatch('performInitialLoad');
    expect(loadEntitiesFromLocalStorage).not.toHaveBeenCalled();
  });

  it('doesnt try loading from localstorage if not in browser', async () => {
    isBrowser.mockImplementation(() => false);
    store.commit('markInitialLoadIncomplete');
    await store.dispatch('performInitialLoad');
    expect(loadEntitiesFromLocalStorage).not.toHaveBeenCalled();
  });
});
