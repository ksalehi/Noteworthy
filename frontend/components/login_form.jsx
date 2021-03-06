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
      password: "",
      loggedIn: false
    });
  },
  componentDidMount: function() {
    ErrorStore.clearErrors();
    this.sessionListener = SessionStore.addListener(this._handleRedirect);
    this.errorListener = ErrorStore.addListener(this.handleErrors);
  },
  componentWillUnmount: function() {
    this.sessionListener.remove();
    this.errorListener.remove();
  },
  _handleRedirect(){
    if (SessionStore.isUserLoggedIn()) {
      // if (!this.state.loggedIn) {
        hashHistory.push('notes');
      // }
    }
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
  changeUsername(e){
    this.setState({username: e.target.value});
  },
  changePassword(e){
    this.setState({password: e.target.value});
  },
  handleSubmit(e){
    e.preventDefault();
    switch(this.props.buttonText) {
      case 'LOG IN':
        const loginData = {
          username: this.state.username,
          password: this.state.password,
        };
        SessionActions.logIn(loginData);
        break;
      case 'SIGN UP':
        const signupData = {
          username: this.state.username,
          password: this.state.password,
        };
        SessionActions.signUp(signupData);
        break;
      }
  },
  render() {
    const guestStatus = this.props.guestStatus;
    const buttonText = this.props.buttonText;
    return (
      <div className="login-form">
        <ul>{this.renderErrors()}</ul>
        <form onSubmit={this.handleSubmit}>
          <div className="username-input">
            <input type="text"
                   className="login-input"
                   placeholder="Username"
                   value={guestStatus ? 'guest_user' : this.state.username}
                   onChange={this.changeUsername}/>
          </div>
          <div className="password-input">
            <input type="password"
                   className="login-input"
                   placeholder="Password"
                   value={guestStatus ? 'password' : this.state.password}
                   onChange={this.changePassword}/>
          </div>
          <input type="submit" className="modal-splash-button" value={buttonText} />
        </form>
      </div>
    );
  }
});

module.exports = LoginForm;
