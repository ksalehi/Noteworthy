const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const SessionStore = new Store(AppDispatcher);
const SessionConstants = require('../constants/session_constants');
const hashHistory = require('react-router').hashHistory;

let _currentUser = {};

SessionStore._login = function(currentUser) {
  _currentUser = currentUser;
  hashHistory.push('notes');
};

SessionStore._logout = function() {
  _currentUser = {};
  setTimeout(()=> {hashHistory.push('/');}, 0);

};

SessionStore.currentUser = function() {
  return Object.assign({}, _currentUser);
};

SessionStore.isUserLoggedIn = function() {
  if (_currentUser.id) {
    return true;
  }
  return false;
};

SessionStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case SessionConstants.LOGIN:
      SessionStore._login(payload.currentUser);
      break;
    case SessionConstants.LOGOUT:
      SessionStore._logout();
      break;
  }
  SessionStore.__emitChange();
};

module.exports = SessionStore;
