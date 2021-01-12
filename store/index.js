// https://medium.com/@brandonaaskov/how-to-test-nuxt-stores-with-jest-9a5d55d54b28

import VuexORM from '@vuex-orm/core';
import database from '@/database';

import {
  saveNotesToLocalStorage,
  loadNotesFromLocalStorage,
  // isBrowser,
} from '../helpers/localstorageHelpers';
import { isBrowser } from '../helpers/browserHelpers';

export const plugins = [VuexORM.install(database)];

// STATE
export const state = () => {
  return {
    notes: [],
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
  addNote: (state, payload) => {
    state.notes.push(payload);
    return state;
  },
  setNotes: (state, payload) => {
    state.notes = payload;
    return state;
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
  addNoteAndSave({ commit, dispatch }, payload) {
    commit('addNote', payload);
    dispatch('saveNotes');
  },

  saveNotes({ state }) {
    saveNotesToLocalStorage(state);
  },

  loadNotes({ commit, state }) {
    console.log('in loadNotes');
    if (isBrowser()) {
      console.log('in the browser, not SSR');
      const deserializedNotes = loadNotesFromLocalStorage();
      commit('setNotes', deserializedNotes);
    }
  },

  performInitialLoad({ commit, dispatch, state }) {
    if (!state.initialLoadComplete) {
      if (isBrowser()) {
        console.log('performing initial notes load');
        dispatch('loadNotes');
        commit('markInitialLoadComplete');
      }
    } else {
      console.log('initial load already complete');
    }
  },
};
