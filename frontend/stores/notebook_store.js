const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const NotebookConstants = require('../constants/notebook_constants');
const NotebookStore = new Store(AppDispatcher);
const hashHistory = require('react-router').hashHistory;

let _notebooks = {};
let _defaultNotebook;

const dateSorter = function(notebook1, notebook2) {
  return (new Date(notebook2.updated_at) - new Date(notebook1.updated_at));
};

NotebookStore.all = function() {
  let unsortedNotebooks = Object.keys(_notebooks).map( notebookKey => {
    return _notebooks[notebookKey];
  });
  _defaultNotebook = unsortedNotebooks[0];
  let sortedNotebooks = unsortedNotebooks.sort(dateSorter);
  return sortedNotebooks;
};

NotebookStore.find = function(id) {
  return _notebooks[id];
};

NotebookStore.defaultNotebook = function() {
  return _defaultNotebook;
};

function resetNotebooks(notebooks) {
  _notebooks = {};
    for (let i = 0; i < notebooks.length; i++) {
      let notebook = notebooks[i];
      _notebooks[notebook.id] = notebook;
    }
}

function resetSingleNotebook(notebook) {
  _notebooks[notebook.id] = notebook;
}

function removeNotebook(notebook) {
  delete _notebooks[notebook.id];
  setTimeout(()=>{
    hashHistory.push(`/notebooks`);
  }, 0);
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
