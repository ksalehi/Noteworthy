const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const NotebookConstants = require('../constants/notebook_constants');
const NotebookStore = new Store(AppDispatcher);

let _notebooks = {};

NotebookStore.all = function() {
  // return Object.assign({}, _notebooks);
  return Object.keys(_notebooks).map( notebookKey => {
    return _notebooks[notebookKey];
  });
};

function resetNotebooks(notebooks) {
  _notebooks = notebooks;
}

function resetSingleNotebook(notebook) {
  _notebooks[notebook.id] = notebook;
}

function removeNotebook(notebook) {
  delete _notebooks[notebook.id];
}

NotebookStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case NotebookConstants.NOTEBOOKS_RECEIVED:
      resetNotebooks(payload.notebooks);
      break;
    case NotebookConstants.NOTEBOOK_RECEIVED:
      resetSingleNotebook(payload.notebook);
      break;
    case NotebookConstants.NOTEBOOK_REMOVED:
      removeNotebook(payload.notebook);
      break;
    }
  NotebookStore.__emitChange();
};

module.exports = NotebookStore;
