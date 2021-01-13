import { isBrowser } from './browserHelpers.js';

export const LOCALSTORAGE_KEY = 'coffeeNotes';

export const LOCALSTORAGE_ENTITIES_KEY = 'coffeeNoteEntities';

// export const isBrowser = () => {
//   return Boolean(process.browser);
// };

export const saveEntitiesToLocalStorage = (entities) => {
  const stringified = JSON.stringify(entities);
  if (isBrowser()) {
    console.log('in browser. attempting to write entities to localstorage');
    localStorage.setItem(LOCALSTORAGE_ENTITIES_KEY, stringified);
  }
};

export const loadEntitiesFromLocalStorage = () => {
  let results;
  if (isBrowser()) {
    const storedEntities = localStorage.getItem(LOCALSTORAGE_ENTITIES_KEY);
    const deserializedEntities = JSON.parse(storedEntities);
    results = deserializedEntities;
  } else {
    results = undefined;
  }
  return results;
};

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
