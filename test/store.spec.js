// https://medium.com/@brandonaaskov/how-to-test-nuxt-stores-with-jest-9a5d55d54b28
import Vuex from 'vuex';
import { createLocalVue } from '@vue/test-utils';

// hmm https://stackoverflow.com/questions/45006254/jest-mock-module-per-test
//  more https://stackoverflow.com/questions/48790927/how-to-change-mock-implementation-on-a-per-single-test-basis-jestjs/54361996#54361996
import Batch from '@/models/Batch';
import { isBrowser } from '../helpers/browserHelpers.js';

jest.mock('../helpers/browserHelpers.js');

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
    // the $fetch spy can't happen until after the store has been configured with localforage plugin
    jest.spyOn(Batch, '$fetch');
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
    expect(Batch.$fetch).toHaveBeenCalled();
  });

  it('will not perform initial load if it is already marked as done', async () => {
    store.commit('markInitialLoadComplete');
    await store.dispatch('performInitialLoad');
    expect(Batch.$fetch).not.toHaveBeenCalled();
  });

  it('doesnt try loading from localstorage if not in browser', async () => {
    isBrowser.mockImplementation(() => false);
    store.commit('markInitialLoadIncomplete');
    await store.dispatch('performInitialLoad');
    expect(Batch.$fetch).not.toHaveBeenCalled();
  });
});
