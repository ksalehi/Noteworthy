const AppDispatcher = require('../dispatcher/dispatcher');
const NoteConstants = require('../constants/note_constants');
const ErrorActions = require('./error_actions');
const NoteApiUtil = require('../util/note_api_util');

const NoteActions = {
  fetchNotes(data={}){
    NoteApiUtil.fetchNotes(
      NoteActions.receiveNotes,
      ErrorActions.setErrors,
      data
    );
  },
  getNote(noteId){
    NoteApiUtil.getNote(
      noteId,
      NoteActions.receiveNote,
      ErrorActions.setErrors
    );
  },
  getLastNote() {
    NoteApiUtil.getLastNote(
      NoteActions.receiveLastNote,
      ErrorActions.setErrors
    );
  },
  createNote(note, callback){
    NoteApiUtil.createNote(
      note,
      NoteActions.receiveNote,
      ErrorActions.setErrors,
      callback
    );
  },
  editNote(note){
    NoteApiUtil.updateNote(
      note,
      NoteActions.receiveNote,
      ErrorActions.setErrors
    );
  },
  deleteNote(noteId, deleteCB){
    NoteApiUtil.deleteNote(
      noteId,
      NoteActions.removeNote,
      ErrorActions.setErrors,
      deleteCB
    );
  },
  receiveNotes(notes){
    AppDispatcher.dispatch({
      actionType: NoteConstants.NOTES_RECEIVED,
      notes: notes
    });
  },
  receiveNotesByNotebook(notes) {
    AppDispatcher.dispatch({
      actionType: NoteConstants.NOTES_BY_NOTEBOOK_RECEIVED,
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
