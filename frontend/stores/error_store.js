const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const ErrorStore = new Store(AppDispatcher);
const ErrorConstants = require('../constants/error_constants');

let _errors = {};
let _form = "";

ErrorStore.formErrors = function(form){
  if (form === _form) {
    return _errors;
  }
};

ErrorStore.form = function(){
  return _form;
};

function setErrors(form, errors) {
  _form = form;
  _errors = errors;
  ErrorStore.__emitChange();
}

function clearErrors(){
  _form = "";
  _errors = {};
  ErrorStore.__emitChange();
}

ErrorStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case ErrorConstants.SET_ERRORS:
      setErrors(payload.form, payload.errors);
      break;
    case  ErrorConstants.CLEAR_ERRORS:
      clearErrors();
      break;
  }
};


module.exports = ErrorStore;
