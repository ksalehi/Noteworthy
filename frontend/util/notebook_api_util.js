const NotebookApiUtil = {
  fetchNotebooks(successCB, notebookData={}) {
    $.ajax({
      method: 'GET',
      url: 'api/notebooks',
      data: notebookData,
      success: successCB
    });
  },
  getNotebook(id, successCB) {
    $.ajax({
      method: 'GET',
      url: `api/notebooks/${id}`,
      success: successCB
    });
  },
  createNotebook(notebookData, successCB, optionalCB){
    $.ajax({
      method: 'POST',
      url: 'api/notebooks',
      data: { notebook: notebookData },
      success(data) {
         successCB(data);
         if (optionalCB) {
           optionalCB(data);
         }
      }
    });
  },
  updateNotebook(notebookData, successCB){
    $.ajax({
      method: 'PATCH',
      url: `api/notebooks/${notebookData.id}`,
      data: { notebook: {
        title: notebookData.title,
        body: notebookData.body
      }},
      success: successCB
    });
  },
  deleteNotebook(id, successCB, deleteCB){
    $.ajax({
      method: 'DELETE',
      url: `api/notebooks/${id}`,
      success(response) {
        successCB(response);
        if (deleteCB) {
          deleteCB(response);
        }
      }
    });
  }
};

module.exports = NotebookApiUtil;
