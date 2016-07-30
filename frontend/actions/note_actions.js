const AppDispatcher = require('../dispatcher/dispatcher');
const NoteConstants = require('../constants/note_constants');
const NoteApiUtil = require('../util/note_api_util');

const NoteActions = {
  fetchNotes(data={}){
    NoteApiUtil.fetchNotes(
      NoteActions.receiveNotes,
      data
    );
  },
  getNote(noteId){
    NoteApiUtil.getNote(
      noteId,
      NoteActions.receiveNote
    );
  },
  getLastNote() {
    NoteApiUtil.getLastNote(
      NoteActions.receiveLastNote
    );
  },
  createNote(note, callback){
    NoteApiUtil.createNote(
      note,
      NoteActions.receiveNote,
      callback
    );
  },
  editNote(note){
    NoteApiUtil.updateNote(
      note,
      NoteActions.receiveNote
    );
  },
  deleteNote(noteId, deleteCB){
    NoteApiUtil.deleteNote(
      noteId,
      NoteActions.removeNote,
      deleteCB
    );
  },
  receiveNotes(notes){
    AppDispatcher.dispatch({
      actionType: NoteConstants.NOTES_RECEIVED,
      notes: notes
    });
  },
  receiveNote(note){
    AppDispatcher.dispatch({
      actionType: NoteConstants.NOTE_RECEIVED,
      note: note
    });
  },
  removeNote(note){
    AppDispatcher.dispatch({
      actionType: NoteConstants.NOTE_REMOVED,
      note: note
    });
  }
};

module.exports = NoteActions;
