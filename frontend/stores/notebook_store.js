const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const NotebookConstants = require('../constants/notebook_constants');
const NotebookStore = new Store(AppDispatcher);
const hashHistory = require('react-router').hashHistory;

let _notebooks = {};

const dateSorter = function(note1, note2) {
  return (new Date(note2.updated_at) - new Date(note1.updated_at));
};

NotebookStore.all = function() {
  let unsortedNotebooks = Object.keys(_notebooks).map( notebookKey => {
    return _notebooks[notebookKey];
  });
  let sortedNotebooks = unsortedNotebooks.sort(dateSorter);
  return sortedNotebooks;
};

function resetNotebooks(notebooks) {
  _notebooks = notebooks;
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
