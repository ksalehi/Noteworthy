const AppDispatcher = require('../dispatcher/dispatcher');
const NotebookConstants = require('../constants/notebook_constants');
const ErrorActions = require('./error_actions');
const NotebookApiUtil = require('../util/notebook_api_util');

const NotebookActions = {
  fetchNotebooks(){
    NotebookApiUtil.fetchNotebooks(
      NotebookActions.receiveNotebooks,
      ErrorActions.setErrors
    );
  },
  getNotebook(notebookId){
    NotebookApiUtil.getNotebook(
      notebookId,
      NotebookActions.receiveNotebook,
      ErrorActions.setErrors
    );
  },
  createNotebook(notebook){
    NotebookApiUtil.createNotebook(
      notebook,
      NotebookActions.receiveNotebook,
      ErrorActions.setErrors
    );
  },
  editNotebook(notebook){
    NotebookApiUtil.updateNotebook(
      notebook,
      NotebookActions.receiveNotebook,
      ErrorActions.setErrors
    );
  },
  deleteNotebook(notebookId){
    NotebookApiUtil.getNotebook(
      notebookId,
      NotebookActions.receiveNotebook,
      ErrorActions.setErrors
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
