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
const NoteCreateForm = require('./components/notes/note_create_form');

const App = React.createClass({
  render(){
    return (
      <div>
        <h1>Capstone</h1>
        {this.props.children}
      </div>
    );
  }
});

const routes = (
  <Route path="/" component={App}>
    <Route path="session/new" component={LoginForm}/>
    <Route path="users/new" component={SignUpForm}/>
    <Route path="notes/new" component={NoteCreateForm}/>
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(
    <Router history={hashHistory}>{routes}</Router>,
    document.getElementById('content')
  );
});
