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
