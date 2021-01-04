import {
  LOCALSTORAGE_KEY,
  deserializeNotes,
  saveNotesToLocalStorage,
} from './localstorageHelpers';

export const state = () => {
  return {
    notes: ["it's good", "I'll yeah"],
  };
};

export const mutations = {
  addNote: (state, payload) => {
    state.notes.push(payload || 'a new note');
    return state;
  },
  setNotes: (state, payload) => {
    state.notes = payload;
    return state;
  },
};

export const actions = {
  addNoteAndSave({ commit, dispatch }, payload) {
    commit('addNote', payload);
    dispatch('saveNotes');
  },
  saveNotes({ state }) {
    saveNotesToLocalStorage(state);
  },
  loadNotes({ commit, state }) {
    console.log('in loadNotesFromLocalStorage');
    if (process.browser) {
      console.log('in the browser, not SSR');
      const storedNotes = window.localStorage.getItem(LOCALSTORAGE_KEY);
      const deserializedNotes = deserializeNotes(storedNotes);
      commit('setNotes', deserializedNotes);
    }
  },
};
