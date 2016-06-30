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

const Modal = require('react-modal');

window.na = NoteActions;
window.ns = NoteStore;

const App = React.createClass({
  logIn(){
    // redirect to login form, or eventually show modal
  },
  render(){
    return (
      <div>
        <h1 className="noteworthy">Noteworthy.</h1>
        <p className="slogan">You write it. We remember it.</p>
        <button onClick={this.logIn}/>
        {this.props.children}
      </div>
    );
  }
});

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={NoteIndex}/>
    <Route path="notes" component={NoteIndex}>
      <Route path="new" component={NoteForm}/>
      <Route path=":noteId" component={NoteDetail}/>
    </Route>
    <Route path="notebooks" component={NotebookIndex}/>
    <Route path="session/new" component={LoginForm}/>
    <Route path="users/new" component={SignUpForm}/>
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  Modal.setAppElement(document.body); //disable entire body when modal is up
  ReactDOM.render(
    <Router history={hashHistory}>{routes}</Router>,
    document.getElementById('content')
  );
});
