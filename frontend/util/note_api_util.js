const NoteApiUtil = {
  fetchNotes(successCB, errorCB) {
    $.ajax({
      method: 'GET',
      url: 'api/notes',
      success: successCB,
      error(response) {
        errorCB("notes_index", response.responseJSON);
      }
    });
  },
  getNote(id, successCB, errorCB) {
    $.ajax({
      method: 'GET',
      url: `api/notes/${id}`,
      success: successCB,
      error(response) {
        errorCB("note_index_item", response.responseJSON);
      }
    });
  },
  createNote(noteData, successCB, errorCB){
    $.ajax({
      method: 'POST',
      url: 'api/notes',
      data: { note: noteData },
      success: successCB,
      error(response) {
        errorCB("note_form", response.responseJSON);
      }
    });
  },
  updateNote(noteData, successCB, errorCB){
    $.ajax({
      method: 'PATCH',
      url: `api/notes/${noteData.id}`,
      data: { note: {
        title: noteData.title,
        body: noteData.body
      }},
      success: successCB,
      error(response) {
        errorCB("note_form", response.responseJSON);
      }
    });
  },
  deleteNote(id, successCB, errorCB){
    $.ajax({
      method: 'DELETE',
      url: `api/notes/${id}`,
      success: successCB,
      error(response) {
        errorCB("delete_note", response.responseJSON);
      }
    });
  }
};

module.exports = NoteApiUtil;
