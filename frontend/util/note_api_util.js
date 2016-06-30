const NoteApiUtil = {
  fetchNotes(successCB, errorCB) {
    $.ajax({
      method: 'GET',
      url: 'api/notes',
      success: successCB,
      error: errorCB
    });
  },
  getNote(id, successCB, errorCB) {
    $.ajax({
      method: 'GET',
      url: `api/notes/${id}`,
      success: successCB,
      error: errorCB
    });
  },
  createNote(noteData, successCB, errorCB){
    $.ajax({
      method: 'POST',
      url: 'api/notes',
      data: { note: noteData },
      success: successCB,
      error(data) {
        errorCB(data);
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
      error: errorCB
    });
  },
  deleteNote(id, successCB, errorCB){
    $.ajax({
      method: 'DELETE',
      url: `api/notes/${id}`,
      success: successCB,
      error: errorCB
    });
  }
};

module.exports = NoteApiUtil;
