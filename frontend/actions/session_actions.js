const AppDispatcher = require('../dispatcher/dispatcher');
const SessionConstants = require('../constants/session_constants');
const SessionApiUtil = require('../util/session_api_util');
const ErrorActions = require('../actions/error_actions');

const SessionActions = {
  logIn(user, callback) {
    SessionApiUtil.logIn(
      user, SessionActions.receiveCurrentUser, ErrorActions.setErrors, callback);
  },
  logOut() {
    SessionApiUtil.logOut(
      SessionActions.removeCurrentUser, ErrorActions.setErrors);
  },
  signUp(user) {
    SessionApiUtil.signUp(
      user, SessionActions.receiveCurrentUser, ErrorActions.setErrors);
  },
  receiveCurrentUser(user){
    AppDispatcher.dispatch({
      actionType: SessionConstants.LOGIN,
      currentUser: user
    });
  },
  removeCurrentUser(){
    AppDispatcher.dispatch({
      actionType: SessionConstants.LOGOUT
    });
  }
};

module.exports = SessionActions;
