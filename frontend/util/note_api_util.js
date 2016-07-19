const NoteApiUtil = {
  fetchNotes(successCB, data={}) {
    $.ajax({
      method: 'GET',
      url: 'api/notes',
      data: data,
      success: successCB
    });
  },
  getNote(id, successCB) {
    $.ajax({
      method: 'GET',
      url: `api/notes/${id}`,
      success: successCB
    });
  },
  createNote(noteData, successCB, optionalCB){
    $.ajax({
      method: 'POST',
      url: 'api/notes',
      data: { note: noteData },
      success(data) {
        successCB(data);
        if (optionalCB) {
          optionalCB(data);
        }
      }
    });
  },
  updateNote(noteData, successCB){
    $.ajax({
      method: 'PATCH',
      url: `api/notes/${noteData.id}`,
      data: { note: {
        title: noteData.title,
        body: noteData.body
      }},
      success: successCB
    });
  },
  deleteNote(id, successCB, deleteCB){
    $.ajax({
      method: 'DELETE',
      url: `api/notes/${id}`,
      success(response) {
         successCB(response);
         deleteCB(id);
      }
    });
  }
};

module.exports = NoteApiUtil;
