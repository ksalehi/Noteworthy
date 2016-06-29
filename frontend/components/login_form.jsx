const React = require('react');
const SessionActions = require('../actions/session_actions.js');
const hashHistory = require('react-router').hashHistory;
const SessionStore  = require('../stores/session_store');
const ErrorStore = require('../stores/error_store');

const LoginForm = React.createClass({
  getInitialState(){
    return ({
      errors: [],
      username: "",
      password: ""
    });
  },
  componentDidMount: function() {
    this.sessionListener = SessionStore.addListener(this.redirectIfLoggedIn);
    this.errorListener = ErrorStore.addListener(this.handleErrors);
  },
  componentWillUnmount: function() {
    this.sessionListener.remove();
    this.errorListener.remove();
  },
  handleErrors(){
    this.setState({errors: ErrorStore.formErrors("login")});
  },
  renderErrors(){
    return this.state.errors.map((error, idx) => {
      return (
        <li key={idx}>{error}</li>
      );
    });
  },
  redirectIfLoggedIn() {
    if (SessionStore.isUserLoggedIn()) {
      hashHistory.push('/');
    }
  },
  changeUsername(e){
    this.setState({username: e.target.value});
  },
  changePassword(e){
    this.setState({password: e.target.value});
  },
  handleSubmit(e){
    e.preventDefault();
    console.log(e);
    const loginData = {
      username: this.state.username,
      password: this.state.password,
    };
    SessionActions.logIn(loginData);
  },
  render() {
    return (
      <div>
        <ul>{this.renderErrors()}</ul>
        <form onSubmit={this.handleSubmit}>
          <label id="username">Username: </label>
          <input type="text"
                 id="username"
                 value={this.state.description}
                 onChange={this.changeUsername}/>
               <label id="password">Password: </label>
          <input type="password"
                 id="password"
                 value={this.state.password}
                 onChange={this.changePassword}/>
          <input type="submit" value="Log In!"/>
        </form>
      </div>
    );
  }
});

module.exports = LoginForm;
