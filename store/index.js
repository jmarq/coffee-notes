// https://medium.com/@brandonaaskov/how-to-test-nuxt-stores-with-jest-9a5d55d54b28

import VuexORM from '@vuex-orm/core';
import VuexORMLocalForage from 'vuex-orm-localforage';
import database from '@/database';
import Bean from '@/models/Bean';
import Batch from '@/models/Batch';

import {
  saveEntitiesToLocalStorage,
  loadEntitiesFromLocalStorage,
} from '../helpers/localstorageHelpers';
import { isBrowser } from '../helpers/browserHelpers';

VuexORM.use(VuexORMLocalForage, { database });

export const plugins = [VuexORM.install(database)];

// STATE
export const state = () => {
  return {
    initialLoadComplete: false,
  };
};
// MUTATIONS
export const mutations = {
  // proof of (perhaps misguided) concept
  //  to set vuex-orm state wholesale from localstorage string
  // this can probably be replaced by the localforage plugin action?
  setEntities: (state, payload) => {
    state.entities = payload;
  },

  markInitialLoadComplete: (state) => {
    state.initialLoadComplete = true;
  },

  markInitialLoadIncomplete: (state) => {
    state.initialLoadComplete = false;
  },
};
// ACTIONS
export const actions = {
  // this can probably be replaced by vuex-orm-localforage $fetch
  loadEntities({ commit, state }) {
    console.log('in loadEntities');
    const stateFromLocalStorage = loadEntitiesFromLocalStorage();
    if (stateFromLocalStorage) {
      commit('setEntities', stateFromLocalStorage);
    }
  },

  // there is vuex-orm-localforage functionality for persisting on save
  //  but is there a matching action for dumping the whole state at once?
  saveEntities({ commit, state }) {
    console.log('in save entities');
    saveEntitiesToLocalStorage(state.entities);
  },

  performInitialLoad({ commit, dispatch, state }) {
    if (!state.initialLoadComplete) {
      if (isBrowser()) {
        console.log('performing initial notes load');
        // vuex-orm-localforage fetch from storage
        Bean.$fetch();
        Batch.$fetch();
        commit('markInitialLoadComplete');
      }
    } else {
      console.log('initial load already complete');
    }
  },
};
