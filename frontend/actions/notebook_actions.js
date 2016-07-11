const AppDispatcher = require('../dispatcher/dispatcher');
const NotebookConstants = require('../constants/notebook_constants');
const ErrorActions = require('./error_actions');
const NotebookApiUtil = require('../util/notebook_api_util');

const NotebookActions = {
  fetchNotebooks(data={}){
    NotebookApiUtil.fetchNotebooks(
      NotebookActions.receiveNotebooks,
      ErrorActions.setErrors,
      data
    );
  },
  getNotebook(notebookId){
    NotebookApiUtil.getNotebook(
      notebookId,
      NotebookActions.receiveNotebook,
      ErrorActions.setErrors
    );
  },
  createNotebook(notebook, callback){
    NotebookApiUtil.createNotebook(
      notebook,
      NotebookActions.receiveNotebook,
      ErrorActions.setErrors,
      callback
    );
  },
  editNotebook(notebook){
    NotebookApiUtil.updateNotebook(
      notebook,
      NotebookActions.receiveNotebook,
      ErrorActions.setErrors
    );
  },
  deleteNotebook(notebookId, deleteCB){
    NotebookApiUtil.deleteNotebook(
      notebookId,
      NotebookActions.removeNotebook,
      ErrorActions.setErrors,
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
