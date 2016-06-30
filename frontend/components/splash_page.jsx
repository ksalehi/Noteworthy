const React = require('react');
const hashHistory = require('react-router').hashHistory;
const LogInForm = require('./login_form');

const SplashPage = React.createClass({
  render() {
    return (
      <div>
        <h1 className="noteworthy">Noteworthy.</h1>
        <p className="slogan">You write it. We remember it.</p>
        <img className="cover-photo"></img>
        <LogInForm />
      </div>
    );
  }
});

module.exports = SplashPage;
