const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const NoteConstants = require('../constants/note_constants');
const NoteStore = new Store(AppDispatcher);
const hashHistory = require('react-router').hashHistory;

let _notes = {};
let _notesByNotebook = {};
let _latestNote;

const dateSorter = function(note1, note2) {
  return (new Date(note2.updated_at) - new Date(note1.updated_at));
};

NoteStore.all = function() {
  let unsortedNotes = Object.keys(_notes).map( noteKey => {
    return _notes[noteKey];
  });
  let sortedNotes = unsortedNotes.sort(dateSorter);
  _latestNote = sortedNotes[0];
  return sortedNotes;
};

NoteStore.allByNotebook = function(){
  // not sure if this is right, come back when people are quieter
  return Object.keys(_notesByNotebook).map( noteKey => {
    return _notesByNotebook[noteKey];
  });
};

NoteStore.getLatestNote = function() {
  NoteStore.all();
  return _latestNote;
};

NoteStore.find = function(id) {
  return _notes[id];
};

function resetNotes(notes) {
  _notes = {};
  for (let i = 0; i < notes.length; i++) {
    let note = notes[i];
    _notes[note.id] = note;
  }
}

function resetNotesByNotebook(notebook) {
  notebook.notes.forEach( note => {
    _notesByNotebook[note.id] = note;
  });
}

function resetSingleNote(note) {
  _notes[note.id] = note;
}

function removeNote(note) {
  delete _notes[note.id];
  setTimeout(()=>{
    const latestNote = NoteStore.getLatestNote();
    hashHistory.push(`/notes/${latestNote.id}`);
  }, 0);
}

NoteStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case NoteConstants.NOTES_RECEIVED:
      resetNotes(payload.notes);
      break;
    case NoteConstants.NOTES_BY_NOTEBOOK_RECEIVED:
      resetNotesByNotebook(payload.notes);
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
