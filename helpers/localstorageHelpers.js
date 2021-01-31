import { isBrowser } from './browserHelpers.js';

export const LOCALSTORAGE_KEY = 'coffeeNotes';

export const LOCALSTORAGE_ENTITIES_KEY = 'coffeeNoteEntities';

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
