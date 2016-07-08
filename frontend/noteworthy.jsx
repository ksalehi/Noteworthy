'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const reactRouter = require('react-router');
const Router = reactRouter.Router;
const Route = reactRouter.Route;
const IndexRoute = reactRouter.IndexRoute;
const hashHistory = reactRouter.hashHistory;
const NoteIndex = require('./components/notes/note_index');
const NotebookIndex = require('./components/notebooks/notebook_index');
const NoteForm = require('./components/notes/note_form');
const SplashPage = require('./components/splash_page');
const SessionStore = require('./stores/session_store');
const SessionActions = require('./actions/session_actions');
const Modal = require('react-modal');
const NavBar = require('./components/nav_bar');
const NotebookDrawer = require('./components/notebooks/notebook_drawer');

window.hh = hashHistory;

const App = React.createClass({
  getInitialState: function() {
    return {
      showing: false
    };
  },
  toggleShowing(){
    this.setState({showing: !this.state.showing});
  },
  render(){
    let navbar;
    if (this.props.location.pathname === '/') {
      navbar = <div></div>;
    } else {
      navbar = <NavBar path={this.props.location.pathname} toggleShowing={this.toggleShowing} />;
    }
    return (
      <div className="flex-parent">
        {navbar}
        <NotebookDrawer showing={this.state.showing} toggleShowing={this.toggleShowing} />
        <div className="note-index-flex">
          {this.props.children}
        </div>
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
      <Route path=":notebookId" component={NoteIndex}>
        <Route path=":noteId" component={NoteForm} />
      </Route>
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
