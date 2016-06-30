const React = require('react');
const hashHistory = require('react-router').hashHistory;
const LogInForm = require('./login_form');

const SplashPage = React.createClass({
  render() {
    return (
      <div className="splash-container">
        <img className="cover-photo"></img>
        <div className="splash-text">
          <h1 className="noteworthy">Noteworthy.</h1>
          <p className="slogan">You write it. We remember it.</p>
          <LogInForm />
        </div>
      </div>
    );
  }
});

module.exports = SplashPage;
