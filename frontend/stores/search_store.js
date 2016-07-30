const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const SearchStore = new Store(AppDispatcher);
const NoteConstants = require('../constants/note_constants');

let _notes = {};

const dateSorter = function(note1, note2) {
  return (new Date(note2.updated_at) - new Date(note1.updated_at));
};

SearchStore.all = function(notebookId) {
  let unsortedNotes = Object.keys(_notes).map( noteKey => {
    return _notes[noteKey];
  });
  if (notebookId) {
    unsortedNotes = unsortedNotes.filter(note => note.notebook_id === parseInt(notebookId));
  }
  let sortedNotes = unsortedNotes.sort(dateSorter);
  return sortedNotes;
};

function resetNotes(notes) {
  _notes = {};
  for (let i = 0; i < notes.length; i++) {
    let note = notes[i];
    _notes[note.id] = note;
  }
  SearchStore.all();
}

SearchStore.__onDispatch = function(payload) {
  if (payload.actionType === NoteConstants.NOTES_RECEIVED) {
    resetNotes(payload.notes);
  }
  SearchStore.__emitChange();
};

module.exports = SearchStore;
