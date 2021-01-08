import { isBrowser } from './browserHelpers.js';

export const LOCALSTORAGE_KEY = 'coffeeNotes';

// export const isBrowser = () => {
//   return Boolean(process.browser);
// };

export const serializeNotes = (state) => {
  return JSON.stringify(state.notes);
};

export const deserializeNotes = (stringNotes) => {
  if (stringNotes) {
    const notes = JSON.parse(stringNotes);
    return notes;
  } else {
    return [];
  }
};

export const saveNotesToLocalStorage = (state) => {
  console.log('in saveNotesToLocalStorage action');
  if (isBrowser()) {
    console.log('in the browser, not SSR');
    const serializedNotes = serializeNotes(state);
    localStorage.setItem(LOCALSTORAGE_KEY, serializedNotes);
  }
};

export const loadNotesFromLocalStorage = () => {
  let results;
  if (isBrowser()) {
    const storedNotes = localStorage.getItem(LOCALSTORAGE_KEY);
    const deserializedNotes = deserializeNotes(storedNotes);
    results = deserializedNotes;
  } else {
    results = [];
  }
  return results;
};
