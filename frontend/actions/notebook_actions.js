const AppDispatcher = require('../dispatcher/dispatcher');
const NotebookConstants = require('../constants/notebook_constants');
const NotebookApiUtil = require('../util/notebook_api_util');

const NotebookActions = {
  fetchNotebooks(data={}){
    NotebookApiUtil.fetchNotebooks(
      NotebookActions.receiveNotebooks,
      data
    );
  },
  getNotebook(notebookId){
    NotebookApiUtil.getNotebook(
      notebookId,
      NotebookActions.receiveNotebook
    );
  },
  createNotebook(notebook, callback){
    NotebookApiUtil.createNotebook(
      notebook,
      NotebookActions.receiveNotebook,
      callback
    );
  },
  editNotebook(notebook){
    NotebookApiUtil.updateNotebook(
      notebook,
      NotebookActions.receiveNotebook
    );
  },
  deleteNotebook(notebookId, deleteCB){
    NotebookApiUtil.deleteNotebook(
      notebookId,
      NotebookActions.removeNotebook,
      deleteCB
    );
  },
  receiveNotebooks(notebooks){
    AppDispatcher.dispatch({
      actionType: NotebookConstants.NOTEBOOKS_RECEIVED,
      notebooks: notebooks
    });
  },
  receiveNotebook(notebook){
    AppDispatcher.dispatch({
      actionType: NotebookConstants.NOTEBOOK_RECEIVED,
      notebook: notebook
    });
  },
  removeNotebook(notebook){
    AppDispatcher.dispatch({
      actionType: NotebookConstants.NOTEBOOK_REMOVED,
      notebook: notebook
    });
  }
};

module.exports = NotebookActions;
