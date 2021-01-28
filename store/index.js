// https://medium.com/@brandonaaskov/how-to-test-nuxt-stores-with-jest-9a5d55d54b28

import VuexORM from '@vuex-orm/core';
import VuexORMLocalForage from 'vuex-orm-localforage';
import database from '@/database';
import Bean from '@/models/Bean';
import Batch from '@/models/Batch';

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
  markInitialLoadComplete: (state) => {
    state.initialLoadComplete = true;
  },

  markInitialLoadIncomplete: (state) => {
    state.initialLoadComplete = false;
  },
};
// ACTIONS
export const actions = {
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
