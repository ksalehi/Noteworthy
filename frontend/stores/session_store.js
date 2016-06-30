const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const SessionStore = new Store(AppDispatcher);
const SessionConstants = require('../constants/session_constants');
const hashHistory = require('react-router').hashHistory;

let _currentUser = {};

SessionStore._login = function(currentUser) {
  _currentUser = currentUser;
  hashHistory.push('notes');
  SessionStore.__emitChange();
};

SessionStore._logout = function() {
  _currentUser = {};
  SessionStore.__emitChange();
};

SessionStore.currentUser = function() {
  return Object.assign({}, _currentUser);
};

SessionStore.isUserLoggedIn = function(user) {
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
};

module.exports = SessionStore;
