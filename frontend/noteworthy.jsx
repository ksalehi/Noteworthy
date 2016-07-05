'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const reactRouter = require('react-router');
const Router = reactRouter.Router;
const Route = reactRouter.Route;
const IndexRoute = reactRouter.IndexRoute;
const hashHistory = reactRouter.hashHistory;
const LoginForm = require('./components/login_form');
const SignUpForm = require('./components/sign_up_form');
const ErrorStore = require('./stores/error_store');
const NoteStore = require('./stores/note_store');
const NoteIndex = require('./components/notes/note_index');
const NoteActions = require('./actions/note_actions');
const NotebookIndex = require('./components/notebooks/notebook_index');
const NoteIndexItem = require('./components/notes/note_index_item');
const NoteDetail = require('./components/notes/note_detail');
const NoteForm = require('./components/notes/note_form');
const SplashPage = require('./components/splash_page');
const SessionStore = require('./stores/session_store');
const SessionActions = require('./actions/session_actions');
const Modal = require('react-modal');
const NewNotebookForm = require('./components/notebooks/new_notebook_form');
const NotebookIndexItem = require('./components/notebooks/notebook_index_item');
const NotebookDetail = require('./components/notebooks/notebook_detail');

window.hh = hashHistory;

const App = React.createClass({
  render(){
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});

function _requireAnonymous() {
  if (SessionStore.isUserLoggedIn()) {
    hashHistory.push('notes');
  }
}

function _ensureLoggedIn(nextState, replace) {
  if (!SessionStore.isUserLoggedIn()) {
    replace('/');
  }
}

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={SplashPage} onEnter={_requireAnonymous}/>
    <Route path="notes" component={NoteIndex} onEnter={_ensureLoggedIn}>
      <IndexRoute component={NoteForm}/>
      <Route path=":noteId" component={NoteForm} />
    </Route>
    <Route path="notebooks" component={NotebookIndex} onEnter={_ensureLoggedIn}>
      <Route path="new" component={NewNotebookForm} />
      <Route path=":notebookId" component={NotebookDetail}/>
    </Route>
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  Modal.setAppElement(document.body);
  if (window.currentUser) {
    SessionActions.receiveCurrentUser(window.currentUser);
  }

  ReactDOM.render(
    <Router history={hashHistory}>{routes}</Router>,
    document.getElementById('content')
  );
});
