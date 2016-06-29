const AppDispatcher = require('../dispatcher/dispatcher');
const NoteConstants = require('../constants/note_constants');
const ErrorActions = require('./error_actions');
const NoteApiUtil = require('../util/note_api_util');

const NoteActions = {
  fetchNotes(){
    NoteApiUtil.fetchNotes(
      NoteActions.receiveNotes,
      ErrorActions.setErrors
    );
  },
  getNote(noteId){
    NoteApiUtil.getNote(
      noteId,
      NoteActions.receiveNote,
      ErrorActions.setErrors
    );
  },
  createNote(note){
    NoteApiUtil.createNote(
      note,
      NoteActions.receiveNote,
      ErrorActions.setErrors
    );
  },
  editNote(note){
    NoteApiUtil.updateNote(
      note,
      NoteActions.receiveNote,
      ErrorActions.setErrors
    );
  },
  deleteNote(noteId){
    NoteApiUtil.getNote(
      noteId,
      NoteActions.receiveNote,
      ErrorActions.setErrors
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
