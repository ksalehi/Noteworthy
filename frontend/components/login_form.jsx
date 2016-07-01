const React = require('react');
const SessionActions = require('../actions/session_actions.js');
const hashHistory = require('react-router').hashHistory;
const SessionStore  = require('../stores/session_store');
const ErrorStore = require('../stores/error_store');

const LoginForm = React.createClass({
  getInitialState(){
    return ({
      modalOpen: false,
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
      <div className="login-form">
        <ul>{this.renderErrors()}</ul>
        <form onSubmit={this.handleSubmit}>
          <div className="username-input">
            <input type="text"
                   placeholder="Username"
                   value={this.state.description}
                   onChange={this.changeUsername}/>
          </div>
          <div className="password-input">
            <input type="password"
                   placeholder="Password"
                   value={this.state.password}
                   onChange={this.changePassword}/>
          </div>
          <input type="submit" className="login-button" value="LOG IN"/>
        </form>

      </div>
    );
  }
});

module.exports = LoginForm;
