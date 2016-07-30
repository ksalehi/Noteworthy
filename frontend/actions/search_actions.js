const AppDispatcher = require('../dispatcher/dispatcher');
const NoteConstants = require('../constants/note_constants');
const SearchApiUtil = require('../util/search_api_util');

const SearchActions = {
  fetchNotes(data={}){
    SearchApiUtil.fetchNotes(
      SearchActions.receiveNotes,
      data
    );
  },
  receiveNotes(notes){
    AppDispatcher.dispatch({
      actionType: NoteConstants.NOTES_RECEIVED,
      notes: notes
    });
  }
};

module.exports = SearchActions;
