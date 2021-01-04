import {
  LOCALSTORAGE_KEY,
  serializeNotes,
  deserializeNotes,
} from './localstorageHelpers';

export const state = () => {
  return {
    notes: ["it's good", "I'll yeah"],
  };
};

export const mutations = {
  addNote: (state, payload) => {
    state.notes.push(payload || 'a new note');
  },
  setNotes: (state, payload) => {
    state.notes = payload;
  },
};

export const actions = {
  saveNotesToLocalStorage({ commit, state }) {
    console.log(commit);
    console.log('in saveNotesToLocalStorage action');
    if (process.browser) {
      console.log('in the browser, not SSR');
      const serializedNotes = serializeNotes(state);
      window.localStorage.setItem(LOCALSTORAGE_KEY, serializedNotes);
    }
  },
  loadNotesFromLocalStorage({ commit, state }) {
    console.log('in loadNotesFromLocalStorage');
    if (process.browser) {
      console.log('in the browser, not SSR');
      const storedNotes = window.localStorage.getItem(LOCALSTORAGE_KEY);
      const deserializedNotes = deserializeNotes(storedNotes);
      commit('setNotes', deserializedNotes);
    }
  },
};
