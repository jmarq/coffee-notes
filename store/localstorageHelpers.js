export const LOCALSTORAGE_KEY = 'coffeeNotes';

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
  if (process.browser) {
    console.log('in the browser, not SSR');
    const serializedNotes = serializeNotes(state);
    window.localStorage.setItem(LOCALSTORAGE_KEY, serializedNotes);
  }
};
