const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const NoteConstants = require('../constants/note_constants');
const NoteStore = new Store(AppDispatcher);

let _notes = {};

NoteStore.all = function() {
  return Object.keys(_notes).map( noteKey => {
    return _notes[noteKey];
  });
};

NoteStore.find = function(id) {
  return _notes[id];
};

function resetNotes(notes) {
  for (let i = 0; i < notes.length; i++) {
    let note = notes[i];
    _notes[note.id] = note;
  }
}

function resetSingleNote(note) {
  _notes[note.id] = note;
}

function removeNote(note) {
  delete _notes[note.id];
}

NoteStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case NoteConstants.NOTES_RECEIVED:
      resetNotes(payload.notes);
      break;
    case NoteConstants.NOTE_RECEIVED:
      resetSingleNote(payload.note);
      break;
    case NoteConstants.NOTE_REMOVED:
      removeNote(payload.note);
      break;
    }
  NoteStore.__emitChange();
};

module.exports = NoteStore;
