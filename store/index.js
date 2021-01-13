// https://medium.com/@brandonaaskov/how-to-test-nuxt-stores-with-jest-9a5d55d54b28

import VuexORM from '@vuex-orm/core';
import database from '@/database';

import {
  saveEntitiesToLocalStorage,
  loadEntitiesFromLocalStorage,
} from '../helpers/localstorageHelpers';
import { isBrowser } from '../helpers/browserHelpers';

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
  loadEntities({ commit, state }) {
    console.log('in loadEntities');
    const stateFromLocalStorage = loadEntitiesFromLocalStorage();
    if (stateFromLocalStorage) {
      commit('setEntities', stateFromLocalStorage);
    }
  },

  saveEntities({ commit, state }) {
    console.log('in save entities');
    saveEntitiesToLocalStorage(state.entities);
  },

  performInitialLoad({ commit, dispatch, state }) {
    if (!state.initialLoadComplete) {
      if (isBrowser()) {
        console.log('performing initial notes load');
        dispatch('loadEntities');
        commit('markInitialLoadComplete');
      }
    } else {
      console.log('initial load already complete');
    }
  },
};
